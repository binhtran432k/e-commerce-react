export interface SearchResult {
	start: number;
	end: number;
	dist: number;
}

function* searchExact(
	needle: string,
	haystack: string,
	startIndex = 0,
	endIndex?: number,
) {
	if (needle.length === 0) return;

	const checkNextIndex = (() => {
		const _endIndex = endIndex ?? haystack.length;
		let _startIndex = startIndex;
		return () => {
			const index = haystack.indexOf(needle, _startIndex);
			const isValid = -1 < index && index <= _endIndex - needle.length;
			_startIndex += 1;
			return [index, isValid] as [number, boolean];
		};
	})();

	let [index, isValid] = checkNextIndex();
	while (isValid) {
		yield index;
		[index, isValid] = checkNextIndex();
	}
}

function reverse(txt: string) {
	return txt.split("").reverse().join("");
}

function makeChar2needleIdx(needle: string, maxDist: number) {
	const res: Record<string, number> = {};
	for (let i = Math.min(needle.length - 1, maxDist); i >= 0; i--) {
		res[needle[i]] = i;
	}
	return res;
}

export function* fuzzySearch(
	needle: string,
	haystack: string,
	maxDist: number,
): Generator<SearchResult> {
	if (needle.length > haystack.length + maxDist) return;

	const ngramLen = Math.floor(needle.length / (maxDist + 1));

	if (maxDist === 0) {
		for (const index of searchExact(needle, haystack)) {
			yield {
				start: index,
				end: index + needle.length,
				dist: 0,
			};
		}
	} else if (ngramLen >= 10) {
		yield* fuzzySearchNgrams(needle, haystack, maxDist);
	} else {
		yield* fuzzySearchCandidates(needle, haystack, maxDist);
	}
}

export function _expand(
	needle: string,
	haystack: string,
	maxDist: number,
): [null, null] | [number, number] {
	const firstDiff = (() => {
		const len = Math.min(needle.length, haystack.length);
		for (let i = 0; i < len; i++) {
			if (needle.charCodeAt(i) !== haystack.charCodeAt(i)) return i;
		}
		return 0;
	})();
	const _needle = needle.slice(firstDiff);
	const _haystack = haystack.slice(firstDiff);

	if (!_needle) {
		return [0, firstDiff];
	}
	if (!_haystack) {
		if (_needle.length <= maxDist) {
			return [_needle.length, firstDiff];
		}
		return [null, null];
	}

	if (maxDist === 0) return [null, null];

	let minScore = null;
	let minScoreIdx = -1;
	{
		let scores = new Array(_needle.length + 1);
		for (let i = 0; i <= maxDist; i++) scores[i] = i;
		let newScores = new Array(_needle.length + 1);

		let maxGoodScore = maxDist;
		let firstGoodScoreIdx = 0;
		let lastGoodScoreIdx = _needle.length - 1;

		for (let haystackIdx = 0; haystackIdx < _haystack.length; haystackIdx++) {
			const char = _haystack.charCodeAt(haystackIdx);

			const needleIdxStart = Math.max(0, firstGoodScoreIdx - 1);
			const needleIdxLimit = Math.min(
				haystackIdx + maxDist,
				_needle.length - 1,
				lastGoodScoreIdx,
			);

			newScores[0] = scores[0] + 1;
			firstGoodScoreIdx = newScores[0] <= maxGoodScore ? 0 : -1;
			lastGoodScoreIdx = newScores[0] <= maxGoodScore ? 0 : -1;

			let needleIdx: number;
			for (
				needleIdx = needleIdxStart;
				needleIdx < needleIdxLimit;
				needleIdx++
			) {
				const score = Math.min(
					scores[needleIdx] + +(char !== _needle.charCodeAt(needleIdx)),
					scores[needleIdx + 1] + 1,
					newScores[needleIdx] + 1,
				);
				newScores[needleIdx + 1] = score;

				if (score <= maxGoodScore) {
					if (firstGoodScoreIdx === -1) firstGoodScoreIdx = needleIdx + 1;
					lastGoodScoreIdx = Math.max(
						lastGoodScoreIdx,
						needleIdx + 1 + (maxGoodScore - score),
					);
				}
			}

			const lastScore = Math.min(
				scores[needleIdx] + +(char !== _needle.charCodeAt(needleIdx)),
				newScores[needleIdx] + 1,
			);
			newScores[needleIdx + 1] = lastScore;

			if (lastScore <= maxGoodScore) {
				if (firstGoodScoreIdx === -1) firstGoodScoreIdx = needleIdx + 1;
				lastGoodScoreIdx = needleIdx + 1;
			}

			if (
				needleIdx === _needle.length - 1 &&
				(minScore === null || lastScore <= minScore)
			) {
				minScore = lastScore;
				minScoreIdx = haystackIdx;
				if (minScore < maxGoodScore) maxGoodScore = minScore;
			}

			[scores, newScores] = [newScores, scores];

			if (firstGoodScoreIdx === -1) break;
		}
	}

	if (minScore !== null && minScore <= maxDist) {
		return [minScore, minScoreIdx + 1 + firstDiff];
	}
	return [null, null];
}

export function* fuzzySearchNgrams(
	needle: string,
	haystack: string,
	maxDist: number,
): Generator<SearchResult> {
	// use n-gram search
	const ngramLen = Math.floor(needle.length / (maxDist + 1));
	const needleLen = needle.length;
	const haystackLen = haystack.length;
	for (
		let ngramStartIdx = 0;
		ngramStartIdx <= needle.length - ngramLen;
		ngramStartIdx += ngramLen
	) {
		const ngram = needle.slice(ngramStartIdx, ngramStartIdx + ngramLen);

		const ngramEnd = ngramStartIdx + ngramLen;
		const needleBeforeReversed = reverse(needle.slice(0, ngramStartIdx));
		const needleAfter = needle.slice(ngramEnd);
		const startIdx = Math.max(0, ngramStartIdx - maxDist);
		const endIdx = Math.min(
			haystackLen,
			haystackLen - needleLen + ngramEnd + maxDist,
		);

		for (const haystackMatchIdx of searchExact(
			ngram,
			haystack,
			startIdx,
			endIdx,
		)) {
			// try to expand left
			const [distRight, rightExpandSize] = _expand(
				needleAfter,
				haystack.slice(
					haystackMatchIdx + ngramLen,
					haystackMatchIdx - ngramStartIdx + needleLen + maxDist,
				),
				maxDist,
			);
			if (distRight === null) continue;

			const [distLeft, leftExpandSize] = _expand(
				needleBeforeReversed,
				reverse(
					haystack.slice(
						Math.max(
							0,
							haystackMatchIdx - ngramStartIdx - (maxDist - distRight),
						),
						haystackMatchIdx,
					),
				),
				maxDist - distRight,
			);
			if (distLeft === null) continue;

			yield {
				start: haystackMatchIdx - leftExpandSize,
				end: haystackMatchIdx + ngramLen + rightExpandSize,
				dist: distLeft + distRight,
			};
		}
	}
}

export function* fuzzySearchCandidates(
	needle: string,
	haystack: string,
	maxDist: number,
): Generator<SearchResult> {
	const debugFlag = false;
	if (debugFlag)
		console.log(`fuzzySearchCandidates(${needle}, ${haystack}, ${maxDist})`);

	// prepare some often used things in advance
	const needleLen = needle.length;
	const haystackLen = haystack.length;
	if (needleLen > haystackLen + maxDist) return;
	const char2needleIdx = makeChar2needleIdx(needle, maxDist);

	let prevCandidates = []; // candidates from the last iteration
	let candidates: {
		startIdx: number;
		needleIdx: number;
		dist: number;
	}[] = []; // new candidates from the current iteration

	// iterate over the chars in the haystack, updating the candidates for each
	for (let i = 0; i < haystack.length; i++) {
		const haystackChar = haystack[i];

		prevCandidates = candidates;
		candidates = [];

		const needleIdx = char2needleIdx[haystackChar];
		if (needleIdx !== undefined) {
			if (needleIdx + 1 === needleLen) {
				if (debugFlag) {
					console.log(
						`yield ${{
							start: i,
							end: i + 1,
							dist: needleIdx,
						}}`,
					);
				}
				yield {
					start: i,
					end: i + 1,
					dist: needleIdx,
				};
			} else {
				candidates.push({
					startIdx: i,
					needleIdx: needleIdx + 1,
					dist: needleIdx,
				});
			}
		}

		for (const candidate of prevCandidates) {
			// if this sequence char is the candidate's next expected char
			if (needle[candidate.needleIdx] === haystackChar) {
				// if reached the end of the needle, return a match
				if (candidate.needleIdx + 1 === needleLen) {
					if (debugFlag) {
						console.log(
							`yield ${{
								start: candidate.startIdx,
								end: i + 1,
								dist: candidate.dist,
							}}`,
						);
					}
					yield {
						start: candidate.startIdx,
						end: i + 1,
						dist: candidate.dist,
					};
				} else {
					// otherwise, update the candidate's needleIdx and keep it
					candidates.push({
						startIdx: candidate.startIdx,
						needleIdx: candidate.needleIdx + 1,
						dist: candidate.dist,
					});
				}
			} else {
				if (candidate.dist === maxDist) continue;

				candidates.push({
					startIdx: candidate.startIdx,
					needleIdx: candidate.needleIdx,
					dist: candidate.dist + 1,
				});

				for (
					let nSkipped = 1;
					nSkipped <= maxDist - candidate.dist;
					nSkipped++
				) {
					if (candidate.needleIdx + nSkipped === needleLen) {
						if (debugFlag) {
							console.log(
								`yield ${{
									start: candidate.startIdx,
									end: i + 1,
									dist: candidate.dist + nSkipped,
								}}`,
							);
						}
						yield {
							start: candidate.startIdx,
							end: i + 1,
							dist: candidate.dist + nSkipped,
						};
						break;
					}

					if (needle[candidate.needleIdx + nSkipped] === haystackChar) {
						if (candidate.needleIdx + nSkipped + 1 === needleLen) {
							if (debugFlag) {
								console.log(
									`yield ${{
										start: candidate.startIdx,
										end: i + 1,
										dist: candidate.dist + nSkipped,
									}}`,
								);
							}
							yield {
								start: candidate.startIdx,
								end: i + 1,
								dist: candidate.dist + nSkipped,
							};
						} else {
							candidates.push({
								startIdx: candidate.startIdx,
								needleIdx: candidate.needleIdx + 1 + nSkipped,
								dist: candidate.dist + nSkipped,
							});
						}
						break;
					}
				}

				if (i + 1 < haystackLen && candidate.needleIdx + 1 < needleLen) {
					candidates.push({
						startIdx: candidate.startIdx,
						needleIdx: candidate.needleIdx + 1,
						dist: candidate.dist + 1,
					});
				}
			}
		}

		if (debugFlag) console.log(candidates);
	}

	for (const candidate of candidates) {
		candidate.dist += needle.length - candidate.needleIdx;
		if (candidate.dist <= maxDist) {
			yield {
				start: candidate.startIdx,
				end: haystack.length,
				dist: candidate.dist,
			};
		}
	}
}
