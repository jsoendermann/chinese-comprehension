// From http://stackoverflow.com/questions/21109011/javascript-unicode-string-chinese-character-but-no-punctuation
const CJK_REGEX = new RegExp(`[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|
[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|
[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]`);

const OBSCURE_CHARACTERS = ['𫟅', '𫟰', '𫠆', '𫠊', '𫘨', '𫗧', '𫖳', '𫖮', '𫖯', '𫔶', '𫓶', '𫐐', '𫍣', '𫍲', '𫌀', '𫇭', '𫄷', '𫄧', '𫄨', '𫄸', '𪟝', '𪣻', '𪊺', '𨠄', '𨛺', '𨚪', '𨚫', '𨐈', '𧴯', '𧯯', '𠸑', '𡊰', '𡋣', '𡋤', '𡛀', '𡛁', '𡚴', '𡟃', '𡟙', '𡟛', '𡟜', '𢁾', '𢃇', '𢃼', '𢑥', '𢒋', '𢓁', '𢓭', '𢘉', '𣂷'];

// From http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Text {
    constructor(originalText) {
        this.originalText = originalText;

        const chineseCharacterIndices = [];
        originalText.split('').map((char, index) => {
            if (CJK_REGEX.test(char)) {
                chineseCharacterIndices.push(index);
            }
        });

        shuffle(chineseCharacterIndices);

        this.substitutions = chineseCharacterIndices.map(index => ({
            index,
            substitutionCharacter: OBSCURE_CHARACTERS[Math.floor(Math.random() * OBSCURE_CHARACTERS.length)]
        }));
    }

    textAtComprehensionLevel(percentComprehension) {
        const numberOfSubstitutedChars = (1 - percentComprehension) * this.substitutions.length;
        const substitutions = this.substitutions.slice(0, numberOfSubstitutedChars);

        let textArray = this.originalText.split('');
        substitutions.forEach(({ index, substitutionCharacter }) => {
            textArray[index] = substitutionCharacter;
        });

        return textArray.join('');
    }
}