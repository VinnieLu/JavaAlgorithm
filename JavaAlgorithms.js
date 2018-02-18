Once upon a time, on a way through the old wild west,…
… a man was given directions to go from one point to another. The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too. Going to one direction and coming back the opposite direction is a needless effort. Since this is the wild west, with dreadfull weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!

How I crossed the desert the smart way.
The directions given to the man are, for example, the following:

["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"].
or

{ "NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST" };
or (haskell)

[North, South, South, East, West, North, West]
You can immediatly see that going "NORTH" and then "SOUTH" is not reasonable, better stay to the same place! So the task is to give to the man a simplified version of the plan. A better plan in this case is simply:

["WEST"]
or

{ "WEST" }
or (haskell)

[West]
or (rust)

[WEST];
Other examples:
In ["NORTH", "SOUTH", "EAST", "WEST"], the direction "NORTH" + "SOUTH" is going north and coming back right away. What a waste of time! Better to do nothing.

The path becomes ["EAST", "WEST"], now "EAST" and "WEST" annihilate each other, therefore, the final result is [] (nil in Clojure).

In ["NORTH", "EAST", "WEST", "SOUTH", "WEST", "WEST"], "NORTH" and "SOUTH" are not directly opposite but they become directly opposite after the reduction of "EAST" and "WEST" so the whole path is reducible to ["WEST", "WEST"].

Task
Write a function dirReduc which will take an array of strings and returns an array of strings with the needless directions removed (W<->E or S<->N side by side).

The Haskell version takes a list of directions with data Direction = North | East | West | South. The Clojure version returns nil when the path is reduced to nothing. The Rust version takes a slice of enum Direction {NORTH, SOUTH, EAST, WEST}.

Examples
dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]) => ["WEST"]
dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH"]) => []
See more examples in "Example Tests"
Note
Not all paths can be made simpler. The path ["NORTH", "WEST", "SOUTH", "EAST"] is not reducible. "NORTH" and "WEST", "WEST" and "SOUTH", "SOUTH" and "EAST" are not directly opposite of each other and can't become such. Hence the result path is itself : ["NORTH", "WEST", "SOUTH", "EAST"].

function dirReduc(arr){
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "NORTH") {
      if (arr[i+1] === "SOUTH") {
        arr.splice(i, 2)
        if (i > 0) {
          i -= 2
        } else {
          i -= 1
        }
      }
    }
    if (arr[i] === "SOUTH") {
      if (arr[i+1] === "NORTH") {
        arr.splice(i, 2)
        if (i > 0) {
          i -= 2
        } else {
          i -= 1
        }
      }
    }
    if (arr[i] === "EAST") {
      if (arr[i+1] === "WEST") {
        arr.splice(i, 2)
        if (i > 0) {
          i -= 2
        } else {
          i -= 1
        }
      }
    }
    if (arr[i] === "WEST") {
      if (arr[i+1] === "EAST") {
        arr.splice(i, 2)
        if (i > 0) {
          i -= 2
        } else {
          i -= 1
        }
      }
    }
  }
  return arr
}
Solution:

function dirReduc(arr){
  // ...
}
Sample Tests:

Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]), ["WEST"])
Test.assertSimilar(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]), ["NORTH", "WEST", "SOUTH", "EAST"])
Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]), [])
​
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT




ROT13 is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet. ROT13 is an example of the Caesar cipher.

Create a function that takes a string and returns the string ciphered with Rot13. If there are numbers or special characters included in the string, they should be returned as they are. Only letters from the latin/english alphabet should be shifted, like in the original Rot13 "implementation".

Please note that using "encode" in Python is considered cheating.

def rot13(string)
  final = ""
  alphabet = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
  i = 0
  until i > string.length - 1
    j = 0
    until j > alphabet.length - 1
      upcase = false
      letter = string[i].downcase
      if letter != string[i]
        upcase = true
      end
      if (("a".."z").include? letter)
        if alphabet[j] == letter
          final += alphabet[j + 13]
          if upcase == true
            final = final[0..-2] + final[-1].upcase
          end
          j = alphabet.length
        end
      else
        final += string[i]
        j = alphabet.length
      end
    j += 1
    end
  i += 1
  end
  return final
end


Complete the solution so that the function will break up camel casing, using a space between words.

Example
solution('camelCasing') // => should return 'camel Casing'

def solution(string)
  final = ""
  i = 0
  until i > string.length - 1
    if string[i].downcase == string[i]
      final += string[i]
    else
      final += " " + string[i]
    end
  i += 1
  end
  return final
end



Your job is to write a function which increments a string, to create a new string. If the string already ends with a number, the number should be incremented by 1. If the string does not end with a number the number 1 should be appended to the new string.

Examples:

foo -> foo1

foobar23 -> foobar24

foo0042 -> foo0043

foo9 -> foo10

foo099 -> foo100

Attention: If the number has leading zeros the amount of digits should be considered.



def increment_string(input)
  if input.to_i != 0 
    this = (input.to_i+1).to_s
    if this.length < input.length 
      i = input.length - this.length 
      until i == 0 
        this = "0" + this
      i -= 1
      end
    end
    return this
  end
  number = ["", 0]
  i = input.length-1
  until i < 0
    if (("a".."z").include? input[i]) || (("A".."Z").include? input[i])
      number[1] = i
      i = -1
    else
      number[0] = input[i] + number[0]
    end
  i -= 1
  end
  final_num = (number[0].to_i+1).to_s
  if final_num.length < number[0].length
    i = number[0].length - final_num.length
    until i == 0
      final_num = "0" + final_num
    i -= 1 
    end
  end
  final = input[0..number[1]] + final_num
end






Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:

domainName("http://github.com/carbonfive/raygun") == "github" 
domainName("http://www.zombie-bites.com") == "zombie-bites"
domainName("https://www.cnet.com") == "cnet"


def domain_name(url)
  final = ""
  i = url.length - 1
  name = false
  until i < 0
    if name == true
      final = url[i] + final
      if url[i-1] == "." || url[i-1] == "/"
        name = false
      end
    end
    if url[i-3..i] == ".com" 
      i -= 3
      name = true
    end
  i -= 1
  end
  return final
end



Task:
Given an array arr of strings complete the function landPerimeter by calculating the total perimeter of all the islands. Each piece of land will be marked with 'X' while the water fields are represented as 'O'. Consider each tile being a perfect 1 x 1piece of land. Some examples for better visualization:

['XOOXO',
 'XOOXO',
 'OOOXO',
 'XXOXO',
 'OXOOO']
or 

 
should return: "Total land perimeter: 24", 
while


['XOOO',
 'XOXO',
 'XOXO',
 'OOXX',
 'OOOO']


should return: "Total land perimeter: 18"

Good luck!


function landPerimeter(arr) {
  var perimeter = 0
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === "X") {
        if (typeof (arr[i-1]) === "undefined") {
          perimeter += 1
        } else if (arr[i-1][j] === "O") {
          perimeter += 1
        } 
        if (typeof (arr[i+1]) === "undefined") {
          perimeter += 1
        } else if (arr[i+1][j] === "O") {
          perimeter += 1
        } 
        if (typeof (arr[i][j+1]) === "undefined") {
          perimeter += 1
        } else if (arr[i][j+1] === "O") {
          perimeter += 1
        } 
        if (typeof (arr[i][j-1]) === "undefined") {
          perimeter += 1
        } else if (arr[i][j-1] === "O") {
          perimeter += 1
        }
      }
    }
  }
  return "Total land perimeter: " + perimeter
}



Task
"AL-AHLY" and "Zamalek" are the best teams in Egypt, but "AL-AHLY" always wins the matches between them. "Zamalek" managers want to know what is the best match they've played so far.

The best match is the match they lost with the minimum goal difference. If there is more than one match with the same difference, choose the one "Zamalek" scored more goals in.

Given the information about all matches they played, return the index of the best match (0-based). If more than one valid result, return the smallest index.

Example
For ALAHLYGoals = [6,4] and zamalekGoals = [1,2], the output should be 1.

Because 4 - 2 is less than 6 - 1

For ALAHLYGoals = [1,2,3,4,5] and zamalekGoals = [0,1,2,3,4], the output should be 4.

The goal difference of all matches are 1, but at 4th match "Zamalek" scored more goals in. So the result is 4.

Input/Output
[input] integer array ALAHLYGoals

The number of goals "AL-AHLY" scored in each match.

[input] integer array zamalekGoals

The number of goals "Zamalek" scored in each match. It is guaranteed that zamalekGoals[i] < ALAHLYGoals[i] for each element.

[output] an integer

Index of the best match.

function bestMatch(ALAHLYGoals, zamalekGoals) {
  var final = [100000000, 1000000000, 1000000000]
  for (var i = 0; i < ALAHLYGoals.length; i++) {
    if (ALAHLYGoals[i] - zamalekGoals[i] < final[1]) {
      final = [i, ALAHLYGoals[i] - zamalekGoals[i], zamalekGoals[i]]
    } else if (ALAHLYGoals[i] - zamalekGoals[i] === final[1]) {
      if (final[2] < zamalekGoals[i]) {
        final = [i, ALAHLYGoals[i] - zamalekGoals[i], zamalekGoals[i]]
      }
    }
    console.log(i + ": " + final)
  }
  return final[0]
}


Pig latin is created by taking all the consonants before the first vowel of a word and moving them to the back of the word followed by the letters "ay".

"hello" => "ellohay"
"creating" => "eatingcray"
If the first letter of the word is a vowel, the string is left the same and the letters "way" are appended to the end.

"algorithm" => "algorithmway"
This problem is different from other variations in that it expects casing to remain the same so:

"Hello World" => "Ellohay Orldway"
as well as punctuation.

"Pizza? Yes please!" => "Izzapay? Esyay easeplay!"
Your job is to take a string and translate it to Pig Latin. The string will never be undefined but may contain both numbers and letters. A word will never be a combination of numbers and letters. Also, there will never be punctuation at the beginning of a word and the only capital letter in a word will be the first letter meaning there are zero all capitalized words.

function translate(sentence) {
  var split = sentence.split(" ")
  var final = []
  for (var i = 0; i < split.length; i++) {
    var substring = split[i]
    var downCase = true
    var punctuation = ""
    for (var l = split[i].length - 1; l >= 0; l--) {
      if ((split[i][l]).toLowerCase() === (split[i][l]).toUpperCase()) {
        punctuation = split[i][split[i].length-1] + punctuation
        substring = substring.substring(0, substring.length-1)
      } else {
        l = -1
      }
    }
    for (var j = 0; j < split[i].length; j++) {
      if (split[i][j].toUpperCase() === split[i][j]) {
        downCase = false
      }
      if (split[i][j].toLowerCase() === "a" || split[i][j].toLowerCase() === "e" || split[i][j].toLowerCase() === "i" || split[i][j].toLowerCase() === "o" || split[i][j].toLowerCase() === "u") {
        if (j === 0) {
          substring += "way"
          j = split[i].length
        } else {
          substring += "ay"
          j = split[i].length
        }
      } else {
        substring = substring.substring(1, substring.length) + substring.substring(0, 1).toLowerCase()
      }
    }
    if (downCase === false) {
      substring = substring[0].toUpperCase() + substring.substring(1, substring.length)
    }
    substring = substring + punctuation
    final.push(substring)
  }
  return final.join(" ")
};



Let's make a function called compose that accepts a value as a parameter, as well as any number of functions as additional parameters.

The function will return the value that results from the first parameter being used as a parameter for all of the accepted function parameters in turn. So:

var doubleTheValue = function(val) { return val * 2; }
var addOneToTheValue = function(val) { return val + 1; }

compose(5, doubleTheValue) // should === 10
compose(5, doubleTheValue, addOneToTheValue) // should === 11
If only a single parameter is passed in, return that parameter.


var compose = function() {
  var final = arguments[0]
  for (var i = 1; i < arguments.length; i++) {
    final = arguments[i](final)
  }
  return final
}



Story
A freak power outage at the zoo has caused all of the electric cage doors to malfunction and swing open...

All the animals are out and some of them are eating each other!

It's a Zoo Disaster!
Here is a list of zoo animals, and what they can eat

antelope eats grass
big-fish eats little-fish
bug eats leaves
bear eats big-fish
bear eats bug
bear eats chicken
bear eats cow
bear eats leaves
bear eats sheep
chicken eats bug
cow eats grass
fox eats chicken
fox eats sheep
giraffe eats leaves
lion eats antelope
lion eats cow
panda eats leaves
sheep eats grass
Kata Task
INPUT
A comma-separated string representing all the things at the zoo

TASK
Figure out who eats who until no more eating is possible.

OUTPUT
A list of strings (refer to the example below) where:

The first element is the initial zoo (same as INPUT)
The last element is a comma-separated string of what the zoo looks like when all the eating has finished
All other elements (2nd to last-1) are of the form X eats Y describing what happened
Notes
Animals can only eat things beside them

Animals always eat to their LEFT before eating to their RIGHT

Always the LEFTMOST animal capable of eating will eat before any others

Any other things you may find at the zoo (which are not listed above) do not eat anything and are not edible

Example
INPUT	
"fox,bug,chicken,grass,sheep"
1	fox can't eat bug	
"fox,bug,chicken,grass,sheep"
2	bug can't eat anything	
"fox,bug,chicken,grass,sheep"
3	chicken eats bug	
"fox,chicken,grass,sheep"
4	fox eats chicken	
"fox,grass,sheep"
5	fox can't eat grass	
"fox,grass,sheep"
6	grass can't eat anything	
"fox,grass,sheep"
7	sheep eats grass	
"fox,sheep"
8	fox eats sheep	
"fox"
OUTPUT	
["fox,bug,chicken,grass,sheep", "chicken eats bug", "fox eats chicken", "sheep eats grass", "fox eats sheep", "fox"]

var whoEatsWho = function(zoo) {
  var eats = { "antelope": ["grass"],
"big-fish": ["little-fish"],
"bug": ["leaves"],
"bear": ["big-fish", "bug", "chicken", "cow", "leaves", "sheep"],
"chicken": ["bug"],
"cow": ["grass"],
"fox": ["chicken", "sheep"],
"giraffe": ["leaves"],
"lion": ["antelope", "cow"],
"panda": ["leaves"],
"sheep": ["grass"] }
  var final = [zoo]
  var split = zoo.split(",")
  for (var i = 0; i < split.length; i++) {
    if ((split[i-1]) && (eats[split[i]])) {
      if (eats[split[i]].includes(split[i-1])) {
        final.push(split[i] + " eats " + split[i-1])
        split.splice(i-1, 1)
        i = -1
      }
    }
    if (i >= 0) {
      if ((split[i+1]) && (eats[split[i]])) {
        if (eats[split[i]].includes(split[i+1])) {
          final.push(split[i] + " eats " + split[i+1])
          split.splice(i+1, 1)
          i = -1
        }
      }
    }
  }
  var string = ""
  for (var g = 0; g < split.length; g++) {
    string += split[g] + ","
  }
  final.push(string.substring(0, string.length-1))
  return final
}



Create a function that transforms any positive number to a string representing the number in words. The function should work for all numbers between 0 and 999999.

Examples
number2words(0)  ==>  "zero"
number2words(1)  ==>  "one"
number2words(9)  ==>  "nine"
number2words(10)  ==>  "ten"
number2words(17)  ==>  "seventeen"
number2words(20)  ==>  "twenty"
number2words(21)  ==>  "twenty-one"
number2words(45)  ==>  "forty-five"
number2words(80)  ==>  "eighty"
number2words(99)  ==>  "ninety-nine"
number2words(100)  ==>  "one hundred"
number2words(301)  ==>  "three hundred one"
number2words(799)  ==>  "seven hundred ninety-nine"
number2words(800)  ==>  "eight hundred"
number2words(950)  ==>  "nine hundred fifty"
number2words(1000)  ==>  "one thousand"
number2words(1002)  ==>  "one thousand two"
number2words(3051)  ==>  "three thousand fifty-one"
number2words(7200)  ==>  "seven thousand two hundred"
number2words(7219)  ==>  "seven thousand two hundred nineteen"
number2words(8330)  ==>  "eight thousand three hundred thirty"
number2words(99999)  ==>  "ninety-nine thousand nine hundred ninety-nine"
number2words(888888)  ==>  "eight hundred eighty-eight thousand eight hundred eighty-eight"


function number2words(n){
  if (n === 0) {
    return "zero"
  }
  var nums = { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty", 30: "thirty", 40: "forty", 50: "fifty", 60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety", "000": "hundred", "0000": "thousand" }
  var strN = String(n)
  var final = ""
  for (var i = 0; i < strN.length; i++) {
    if (strN[i] === "0") {
      final += ""
    } else if (strN.length - i === 6) {
      final += nums[Number(strN[i])] + " " + nums["000"]
      if (Number(strN.substring(i+1, strN.length)) !== 0) {
        final += " "
      }
      if ((Number(strN[i+2]) === 0) && (Number(strN[i+1]) === 0)) {
        final += nums["0000"] + " "
      }
    } else if (strN.length - i === 5) {
      if (strN[i] === "1") {
          final += nums[Number(strN[i] + strN[i+1])] + " " + nums["0000"]
          if (Number(strN.substring(i+1, strN.length)) !== 0) {
            final += " "
          }
          i += 1
      } else { 
        final += nums[Number(strN[i] + "0")]
        if (Number(strN[i+1]) === 0) {
          final += " " + nums["0000"] + " "
        } else {
          final += "-"
        }
      }
    } else if (strN.length - i === 4) {
      final += nums[Number(strN[i])] + " " + nums["0000"]
      if (Number(strN.substring(i+1, strN.length)) !== 0) {
        final += " "
      }
    } else if (strN.length - i === 3) {
      final += nums[Number(strN[i])] + " " + nums["000"]
      if (Number(strN.substring(i+1, strN.length)) !== 0) {
        final += " "
      }
    } else if (strN.length - i === 2) {
        if (strN[i] === "1") {
          final += nums[Number(strN[i] + strN[i+1])]
          i += 1
        } else { 
          final += nums[Number(strN[i] + "0")]
          if (strN[i+1] != "0") {
            final += "-"
          }
        }
    } else if (strN.length - i === 1) {
      final += nums[Number(strN[i])]
    }
  }
  return final
}
Solution:

function number2words(n){
  // works for numbers between 0 and 999999   
}
Sample Tests:

Test.assertEquals(number2words(0),"zero");
Test.assertEquals(number2words(1),"one");
Test.assertEquals(number2words(8),"eight");
Test.assertEquals(number2words(10),"ten");
Test.assertEquals(number2words(19),"nineteen");
Test.assertEquals(number2words(20),"twenty");
Test.assertEquals(number2words(22),"twenty-two");
Test.assertEquals(number2words(54),"fifty-four");
Test.assertEquals(number2words(80),"eighty");
Test.assertEquals(number2words(98),"ninety-eight");
Test.assertEquals(number2words(100),"one hundred");
Test.assertEquals(number2words(301),"three hundred one");
Test.assertEquals(number2words(793),"seven hundred ninety-three");
Test.assertEquals(number2words(800),"eight hundred");
Test.assertEquals(number2words(650),"six hundred fifty");
Test.assertEquals(number2words(1000),"one thousand");
Test.assertEquals(number2words(1003),"one thousand three");
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT




Background
There is a message that is circulating via public media that claims a reader can easily read a message where the inner letters of each words is scrambled, as long as the first and last letters remain the same and the word contains all the letters.

Another example shows that it is quite difficult to read the text where all the letters are reversed rather than scrambled.

In this kata we will make a generator that generates text in a similar pattern, but instead of scrambled or reversed, ours will be sorted alphabetically

Requirement
return a string where:
1) the first and last characters remain in original place for each word
2) characters between the first and last characters must be sorted alphabetically
3) punctuation should remain at the same place as it started, for example: shan't -> sahn't

Assumptions
1) words are seperated by single spaces
2) only spaces separate words, special characters do not, for example: tik-tak -> tai-ktk
3) special characters do not take the position of the non special characters, for example: -dcba -> -dbca
4) for this kata puctuation is limited to 4 characters: hyphen(-), apostrophe('), comma(,) and period(.) 
5) ignore capitalisation

for reference: http://en.wikipedia.org/wiki/Typoglycemia

ScrambleWords = function(str){
  var split = str.split(" ")
  var final = []
  for (var i = 0; i < split.length; i++) {
    var punctuation = []
    var complete = ""
    var middle = []
    for (var j = 0; j < split[i].length; j++) {
      if (split[i][split[i].length - 1] === "-" || split[i][split[i].length - 1] === "'" || split[i][split[i].length - 1] === "," || split[i][split[i].length - 1] === ".") {
        punctuation.push([split[i][split[i].length-1], split[i].length-1])
        split[i] = split[i].substring(0, split[i].length - 1)
        j -= 1
      } else if (split[i][j] === "-" || split[i][j] === "'" || split[i][j] === "," || split[i][j] === ".") {
        punctuation.push([split[i][j], j])
        if (j === 0) {
          split[i] = split[i].substring(1, split[i].length)
        } else {
          split[i] = split[i].substring(0, j) + split[i].substring(j + 1, split[i].length)
        }
        j -= 1
      } else if ((j === 0) || (j === split[i].length - 1)) {
        complete += split[i][j]
      } else {
        middle.push(split[i][j])
      }
    }
    middle.sort()
    middle.push(complete[1])
    middle.unshift(complete[0])
    for (var x = 0; x < punctuation.length; x++) {
      middle.splice(punctuation[x][1], 0, punctuation[x][0])
    }
    final.push(middle.join(""))
  }
  return final.join(" ")
};
Solution:

ScrambleWords = function(str){
  //start here
};
Sample Tests:

Test.describe("Basic tests", function(){
Test.assertEquals(ScrambleWords('professionals'), 'paefilnoorsss', 'The first and last letters of a word should reamin in place with the inner letters sorted')
Test.assertEquals(ScrambleWords('i'), 'i', 'Must handle single charater words')
Test.assertEquals(ScrambleWords('me'), 'me', 'Must handle 2 charater words')
Test.assertEquals(ScrambleWords('you'), 'you', 'Must handle 3 charater words')
Test.assertEquals(ScrambleWords('card-carrying'), 'caac-dinrrryg', 'Only spaces separate words and punctuation should remain at the same place as it started')
Test.assertEquals(ScrambleWords("shan't"), "sahn't", 'Punctuation should remain at the same place as it started')
Test.assertEquals(ScrambleWords('-dcba'), '-dbca', 'Must handle special character at the start')
Test.assertEquals(ScrambleWords('dcba.'), 'dbca.', 'Must handle special character at the end')
Test.assertEquals(ScrambleWords("you've gotta dance like there's nobody watching, love like you'll never be hurt, sing like there's nobody listening, and live like it's heaven on earth."), "you've gotta dacne like teehr's nbdooy wachintg, love like ylo'ul neevr be hrut, sing like teehr's nbdooy leiinnstg, and live like it's haeevn on earth.", 'Must handle a full sentence')
})
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT


Introduction
Hamsters are rodents belonging to the subfamily Cricetinae. The subfamily contains about 25 species, classified in six or seven genera. They have become established as popular small house pets, and, partly because they are easy to breed in captivity, hamsters are often used as laboratory animals. Wikipedia Link

hamster

And you could have skipped the introduction as it is entirely unrelated to your task. xD

Task
Write a function that accepts two inputs: code and message and returns an encrypted string from message using the code.
The code is a string that generates the key in the way shown below:

 1  | h a m s t e r
 2  | i b n   u f
 3  | j c o   v g
 4  | k d p   w
 5  | l   q   x
 6  |         y
 7  |         z
All letters from code get number 1. All letters which directly follow letters from code get number 2 (unless they already have a smaller number assigned), etc. It's difficult to describe but it should be easy to understand from the example below:

 1  | a e h m r s t
 2  | b f i n     u
 3  | c g j o     v
 4  | d   k p     w
 5  |     l q     x
 6  |             y
 7  |             z
How does the encoding work using the hamster code?

a => a1
b => a2
c => a3
d => a4
e => e1
f => e2
...
And applying it to strings :

hamsterMe('hamster', 'hamster')   => h1a1m1s1t1e1r1
hamsterMe('hamster', 'helpme')    => h1e1h5m4m1e1
And you probably started wondering what will happen if there is no a in the code.
Just add these letters after the last available letter (in alphabetic order) in the code.

The key for code hmster is:

 1  | e h m r s t
 2  | f i n     u
 3  | g j o     v
 4  |   k p     w
 5  |   l q     x
 6  |           y
 7  |           z
 8  |           a
 9  |           b
10  |           c
11  |           d
Additional notes
The code will have at least 1 letter.
Duplication of letters in code is possible and should be handled.
The code and message consist of only lowercase letters.


function hamsterMe(code, message) {
  var alphabet = "abcdefghijklmnopqrstuvwxyz"
  var comp = {}
  for (var i = 0; i < code.length; i++) {
    if (!(comp[code[i]])) {
      comp[code[i]] = []
    }
  }
  var thisOne = 0
  for (var j = 0; j < alphabet.length; j++) {
    if (comp[alphabet[j]]) {
      if (thisOne) {
        thisOne = alphabet[j]
      } else {
        var thisOne = alphabet[j]
        var redo = j
      }
    } else if (thisOne) {
      comp[thisOne].push(alphabet[j])
    }
    if (alphabet[j] === "z") {
      for (var e = 0; e < redo; e++) {
        comp[thisOne].push(alphabet[e])
      }
    }
  }
  var count = {}
  Object.keys(comp).forEach(function(letter) {
    count[letter] = letter + "1"
    for (var g = 0; g < comp[letter].length; g++) {
      count[comp[letter][g]] = letter + "" + (g + 2)
    }
  })
  var final = ""
  for (var t = 0; t < message.length; t++) {
    final += count[message[t]]
  }
  return final
}
Solution:

function hamsterMe(code, message) {
    return message;
}
Sample Tests:

Test.assertEquals(hamsterMe("hamster", "hamster") , "h1a1m1s1t1e1r1" );
Test.assertEquals(hamsterMe("hamster", "helpme") , "h1e1h5m4m1e1" );
Test.assertEquals(hamsterMe("hmster", "hamster") , "h1t8m1s1t1e1r1", "Lack of letter in the code?");
Test.assertEquals(hamsterMe("hhhhammmstteree", "hamster") , "h1a1m1s1t1e1r1", "Duplication of letters in code?" );
Test.assertEquals(hamsterMe("hamster", "abcdefghijklmnopqrstuvwxyz") , "a1a2a3a4e1e2e3h1h2h3h4h5m1m2m3m4m5r1s1t1t2t3t4t5t6t7" );
Test.assertEquals(hamsterMe("f", "abcdefghijklmnopqrstuvwxyz") , "f22f23f24f25f26f1f2f3f4f5f6f7f8f9f10f11f12f13f14f15f16f17f18f19f20f21", "One letter code ?");
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT




A Man and his Umbrellas
Each morning a man walks to work, and each afternoon he walks back home.

If it is raining in the morning and he has an umbrella at home, he takes an umbrella for the journey so he doesn't get wet, and stores it at work. Likewise, if it is raining in the afternoon and he has an umbrella at work, he takes an umbrella for the journey home.

Given an array of the weather conditions, your task is to work out the minimum number of umbrellas he needs to start with in order that he never gets wet. He can start with some umbrellas at home and some at work, but the output is a single integer, the minimum total number.

The input is an array/list of consecutive half-day weather forecasts. So, e.g. the first value is the 1st day's morning weather and the second value is the 1st day's afternoon weather. The options are "clear", "sunny", "cloudy", "rainy", "windy" or "thunderstorms".

e.g. for three days, 6 values:

weather = ["rainy", "cloudy", "sunny", "sunny", "cloudy", "thunderstorms"]
N.B. He never takes an umbrella if it is not raining.

Examples:
minUmbrellas(["rainy", "clear", "rainy", "cloudy"])
// should return 2
// Because on the first morning, he needs an umbrella to take, and he leaves it at work.
// So on the second morning, he needs a second umbrella.

minUmbrellas(["sunny", "windy", "sunny", "clear"])
// should return 0
// Because it doesn't rain at all

minUmbrellas(["rainy", "rainy", "rainy", "rainy", "thunderstorms", "rainy"])
// should return 1
// Because he only needs 1 umbrella which he takes on every journey.



function minUmbrellas(weather) {
  var workUmb = 0
  var homeUmb = 0
  for (var i = 0; i < weather.length; i++) {
    if (i % 2 === 0 && (weather[i] === "rainy" || weather[i] === "thunderstorms")) {
      if (homeUmb === 0) {
        workUmb += 1
      } else if (homeUmb > 0 && (weather[i] === "rainy" || weather[i] === "thunderstorms")) {
        homeUmb -= 1
        workUmb += 1
      }
    } else if (i % 2 === 1 && (weather[i] === "rainy" || weather[i] === "thunderstorms")) {
      if (workUmb === 0) {
        homeUmb += 1
      } else if (workUmb > 0 && (weather[i] === "rainy" || weather[i] === "thunderstorms")) {
        workUmb -= 1
        homeUmb += 1
      }
    }
  }
  return homeUmb + workUmb
}
Solution:

function minUmbrellas(weather) {
  // TODO
}
Sample Tests:

Test.describe("Basic tests", function() {
  Test.assertEquals(minUmbrellas(["cloudy"]), 0, "wrong answer for one value in weather array");
  Test.assertEquals(minUmbrellas(["rainy", "rainy", "rainy", "rainy"]), 1, "wrong answer for always rainy.");
  Test.assertEquals(minUmbrellas(["overcast", "rainy", "clear", "thunderstorms"]), 2, "wrong answer for 2 dry mornings and 2 rainy afternoons.");
  // add more tests here if you like.
});
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT




You know about simple Array.diff task. Now try to solve enhanced version!

Your goal in this kata is to implement a difference function, which subtracts one list from another.

It should remove all values from list a, which are present in list b. Each element x in both arrays is integer and 0 ≤ x ≤ 25. And lengths of arrays can reach 5 000 000 elements.

array_diff_very_fast([1,2],[1]) == [2]
If a value is present in b, all of its occurrences must be removed from another:

array_diff_very_fast([1,2,2,2,3],[2]) == [1,3]



function array_diff_very_fast(a, b) {
  var count = {}
  for (var i = 0; i < b.length; i++) {
    if (typeof (count[b[i]]) === "undefined") {
      count[b[i]] = -1
    }
  }
  var final = []
  for (var j = 0; j < a.length; j++) {
    if (typeof (count[a[j]]) === "undefined") {
      final.push(a[j])
    }
  }
  return final
}



Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

For example:

 persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                       // and 4 has only one digit

 persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
                        // 1*2*6 = 12, and finally 1*2 = 2

 persistence(4) === 0 // because 4 is already a one-digit number



 function persistence(num) {
   if (String(num).length === 1) {
     return 0
   }
   single = 2
   for (var i = 0; single > 1; i++) {
     var mult = ""
     for(var j = 0; j < String(num).length; j++) {
       mult += (String(num))[j] + "*"
     }
     var num = eval(mult.substring(0, mult.length-1))
     var single = String(num).length
     var total = i
   }
   return total += 1
}



Given: an array containing hashes of names

Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.

Example:

list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
// returns 'Bart, Lisa & Maggie'

list([ {name: 'Bart'}, {name: 'Lisa'} ])
// returns 'Bart & Lisa'

list([ {name: 'Bart'} ])
// returns 'Bart'

list([])
// returns ''


function list(names){
  final = ""
  if (names.length === 1) {
    return names[0]["name"]
  }
  for (i=0; i<names.length; i++) {
    if (i === names.length-1) {
      final = final.substring(0, final.length-2)
      final += " & " + names[i]["name"]
    } else {
      final += names[i]["name"] + ", "
    }
  }
  return final
}



Description:
Given an array (arr) as an argument complete the function countSmileys that should return the total number of smiling faces.

Rules for a smiling face:
-Each smiley face must contain a valid pair of eyes. Eyes can be marked as : or ;
-A smiley face can have a nose but it does not have to. Valid characters for a nose are - or ~
-Every smiling face must have a smiling mouth that should be marked with either ) or D.
No additional characters are allowed except for those mentioned.
Valid smiley face examples:
:) :D ;-D :~)
Invalid smiley faces:
;( :> :} :] 

Example cases:

countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;

Note: In case of an empty array return 0. You will not be tested with invalid input (input will always be an array). Order of the face (eyes, nose, mouth) elements will always be the same

Happy coding!


function countSmileys(arr) {
  final = 0
  for (i=0; i<arr.length; i++) {
    if (arr[i][0] === ":" || arr[i][0] === ";") {
      if (arr[i][1] === "-" || arr[i][1] === "~") {
        if (arr[i][2] === ")" || arr[i][2] === "D") {
          final += 1
        }
      } else if (arr[i][1] === ")" || arr[i][1] === "D") {
        final += 1
      }
    }
  }
  return final
}



You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement a function likes :: [String] -> String, which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:

likes [] // must be "no one likes this"
likes ["Peter"] // must be "Peter likes this"
likes ["Jacob", "Alex"] // must be "Jacob and Alex like this"
likes ["Max", "John", "Mark"] // must be "Max, John and Mark like this"
likes ["Alex", "Jacob", "Mark", "Max"] // must be "Alex, Jacob and 2 others like this"
For more than 4 names, the number in and 2 others simply increases.


function likes(names) {
  if (names.length === 0) {
    return "no one likes this"
  } else if (names.length === 1) {
    return names[0] + " likes this"
  } else if (names.length === 2) {
    return names[0] + " and " + names[1] + " like this"
  } else if (names.length === 3) {
    return names[0] + ", " + names[1] + " and " + names[2] +  " like this"
  } else if (names.length > 3) {
    return names[0] + ", " + names[1] + " and " + (names.length - 2) + " others like this"
  }
}


Given an array, find the int that appears an odd number of times.

There will always be only one integer that appears an odd number of times.



function findOdd(A) {
  var count = {}
  for (var i=0; i<A.length; i++) {
    if (count[A[i]]) {
      count[A[i]] += 1
    } else {
      count[A[i]] = 1
    }
  }
  for (var j=0; j<A.length; j++) {
    if (count[A[j]] % 2 === 1) {
      return A[j]
    }
  }
  return 0;
}


You live in the city of Cartesia where all roads are laid out in a perfect grid. You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk. The city provides its citizens with a Walk Generating App on their phones -- everytime you press the button it sends you an array of one-letter strings representing directions to walk (eg. ['n', 's', 'w', 'e']). You know it takes you one minute to traverse one city block, so create a function that will return true if the walk the app gives you will take you exactly ten minutes (you don't want to be early or late!) and will, of course, return you to your starting point. Return false otherwise.

Note: you will always receive a valid array containing a random assortment of direction letters ('n', 's', 'e', or 'w' only). It will never give you an empty array (that's not a walk, that's standing still!).


function isValidWalk(walk) {
  if (walk.length != 10) {
    return false
  } else {
    var coordinates = [0, 0]
    for (i=0; i<walk.length; i++) {
      if (walk[i] === "n") {
        coordinates[0] += 1
      } else if (walk[i] === "s") {
        coordinates[0] -= 1
      } else if (walk[i] === "w") {
        coordinates[1] += 1
      } else if (walk[i] === "e") {
        coordinates[1] -= 1
      }
    }
    if (coordinates[0] === 0 && coordinates[1] === 0) {
      return true
    } else {
      return false
    }
  }
}
Solution:

function isValidWalk(walk) {
  //insert brilliant code here
}
Sample Tests:

//some test cases for you...
Test.expect(isValidWalk(['n','s','n','s','n','s','n','s','n','s']), 'should return true');
Test.expect(!isValidWalk(['w','e','w','e','w','e','w','e','w','e','w','e']), 'should return false');
Test.expect(!isValidWalk(['w']), 'should return false');
Test.expect(!isValidWalk(['n','n','n','s','n','s','n','s','n','s']), 'should return false');
​
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT



Bob is preparing to pass IQ test. The most frequent task in this test is to find out which one of the given numbers differs from the others. Bob observed that one number usually differs from the others in evenness. Help Bob — to check his answers, he needs a program that among the given numbers finds one that is different in evenness, and return a position of this number.

! Keep in mind that your task is to help Bob solve a real IQ test, which means indexes of the elements start from 1 (not 0)

##Examples :

iqTest("2 4 7 8 10") => 3 // Third number is odd, while the rest of the numbers are even

iqTest("1 2 1 1") => 2 // Second number is even, while the rest of the numbers are odd

function iqTest(numbers){
  var split = numbers.split(" ")
  if (split[0] % 2 === 0 && split[1] % 2 != 0 && split[2] % 2 != 0) {
    console.log("banana")
    return 1
  } else if (split[1] % 2 === 0 && split[0] % 2 != 0 && split[2] % 2 != 0) {
    return 2
  } else if (split[2] % 2 === 0 && split[1] % 2 != 0 && split[0] % 2 != 0) {
    return 3
  } else if (split[0] % 2 === 1 && split[1] % 2 === 0 && split[2] % 2 === 0) {
    return 1
  } else if (split[1] % 2 === 1 && split[0] % 2 === 0 && split[2] % 2 === 0) {
    return 2
  } else if (split[2] % 2 === 1 && split[1] % 2 === 0 && split[0] % 2 === 0) {
    return 3
  }
  var count = {}
  count["odd"] = 1
  count["even"] = 1
  for (i=0; i<split.length; i++) {
    if (split[i] % 2 === 0) {
      count["even"] += 1
    } else {
      count["odd"] += 1
    }
    if ((count["odd"] > 2 && count["even"] === 2) || (count["odd"] === 2 && count["even"] > 2)) {
      return i + 1
    }
  }
}
Solution:

function iqTest(numbers){
  // ...
}
Sample Tests:

Test.assertEquals(iqTest("2 4 7 8 10"),3);
Test.assertEquals(iqTest("1 2 2"), 1);
​
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT



Your goal in this kata is to implement an difference function, which subtracts one list from another.

It should remove all values from list a, which are present in list b.

array_diff([1,2],[1]) == [2]
If a value is present in b, all of its occurrences must be removed from the other:

array_diff([1,2,2,2,3],[2]) == [1,3]


function array_diff(a, b) {
  var final = []
  for (var i = 0; i < a.length; i++) {
    if (!(b.includes(a[i]))) {
      final.push(a[i])
    }
  }
  return final
}
function array_diff(a, b) {
  var count = {}
  for (var i = 0; i < b.length; i++) {
    if (typeof (count[b[i]]) === "undefined") {
      count[b[i]] = -1
    }
  }
  console.log(count)
  var final = []
  for (var j = 0; j < a.length; j++) {
    if (typeof (count[a[j]]) === "undefined") {
      final.push(a[j])
    }
  }
  return final
}


Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

For example:

uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
uniqueInOrder([1,2,2,3,3])       == [1,2,3]

var uniqueInOrder=function(iterable){
  var array = []
  for (var x = 0; x < iterable.length; x++) {
    if (iterable[x] !== iterable[x-1]) {
      array.push(iterable[x])
        } 
    } return array
}


Count the number of Duplicates
Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.

Example
"abcde" -> 0 # no characters repeats more than once
"aabbcde" -> 2 # 'a' and 'b'
"aabBcde" -> 2 # 'a' occurs twice and 'b' twice (bandB)
"indivisibility" -> 1 # 'i' occurs six times
"Indivisibilities" -> 2 # 'i' occurs seven times and 's' occurs twice
"aA11" -> 2 # 'a' and '1'
"ABBA" -> 2 # 'A' and 'B' each occur twice




function duplicateCount(text){
  total = 0
  count = {}
  downcase = text.toLowerCase()
  for (i=0; i<downcase.length; i++) {
    if (count[downcase[i]]) {
      count[downcase[i]] += 1
    } else {
      count[downcase[i]] = 1
    }
  }
  Object.keys(count).forEach(function(keys) {
    if(count[keys] > 1) {
      total += 1
    }
  })
  return total
}



Welcome.

In this kata you are required to, given a string, replace every letter with its position in the alphabet.

If anything in the text isn't a letter, ignore it and don't return it.

a being 1, b being 2, etc.

As an example:

alphabet_position("The sunset sets at twelve o' clock.")
Should return "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11" as a string.


function alphabetPosition(text) {
  var alphabet = "abcdefghijklmnopqrstuvwxyz"
  var final = ""
  for (var i = 0; i < text.length; i++) {
    for (var j = 0; j < alphabet.length; j++) {
      if (text[i].toLowerCase() === alphabet[j]) {
        final += (j + 1) + " "
      }
    }
  }
  return final.substring(0, final.length - 1)
}


Your task is to sort a given string. Each word in the String will contain a single number. This number is the position the word should have in the result.

Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

If the input String is empty, return an empty String. The words in the input String will only contain valid consecutive numbers.

For an input: "is2 Thi1s T4est 3a" the function should return "Thi1s is2 3a T4est"

your_order("is2 Thi1s T4est 3a")
[1] "Thi1s is2 3a T4est"


function order(words){
  if (words === "") {
    return ""
  }
  array = words.split(" ")
  final = ""
  count = {}
  for (i=0; i<array.length; i++) {
    for (j=0; j<array[i].length; j++) {
      if (array[i][j] === "1" || array[i][j] === "2" || array[i][j] === "3" || array[i][j] === "4" || array[i][j] === "5" || array[i][j] === "6" || array[i][j] === "7" || array[i][j] === "8" || array[i][j] === "9") {
        count[array[i][j]] = array[i]
      }
    }
  }
  for (k=1; k<array.length+1; k++) {
    final += count[String(k)] + " "
  }
  return final.substring(0, final.length-1)
}




You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N. If there is no index that would make this happen, return -1.

For example:

Let's say you are given the array {1,2,3,4,3,2,1}:
Your function will return the index 3, because at the 3rd position of the array, the sum of left side of the index ({1,2,3}) and the sum of the right side of the index ({3,2,1}) both equal 6.

Let's look at another one.
You are given the array {1,100,50,-51,1,1}:
Your function will return the index 1, because at the 1st position of the array, the sum of left side of the index ({1}) and the sum of the right side of the index ({50,-51,1,1}) both equal 1.

Last one:
You are given the array {20,10,-80,10,10,15,35}
At index 0 the left side is {}
The right side is {10,-80,10,10,15,35}
They both are equal to 0 when added. (Empty arrays are equal to 0 in this problem)
Index 0 is the place where the left side and right side are equal.

Note: Please remember that in most programming/scripting languages the index of an array starts at 0.

Input:
An integer array of length 0 < arr < 1000. The numbers in the array can be any integer positive or negative.

Output:
The lowest index N where the side to the left of N is equal to the side to the right of N. If you do not find an index that fits these rules, then you will return -1.

Note:
If you are given an array with multiple answers, return the lowest correct index.
An empty array should be treated like a 0 in this problem.



def find_even_index(arr)
  left = 0
  right = 0
  i = 0
  until i > arr.length - 1
    right = 0
    j = i + 1
    until j > arr.length - 1
      right += arr[j]
    j += 1
    end
    if left == right
      return i
    end
    left += arr[i]
  i += 1  
  end
  return -1
end



Short Intro

Some of you might remember spending afternoons playing Street Fighter 2 in some Arcade back in the 90s or emulating it nowadays with the numerous emulators for retro consoles.

Can you solve this kata? Suuure-You-Can!

UPDATE: a new kata's harder version is available here.

The Kata

You'll have to simulate the video game's character selection screen behaviour, more specifically the selection grid. Such screen looks like this:

alt text

Selection Grid Layout in text:

| Ryu  | E.Honda | Blanka  | Guile   | Balrog | Vega    |
| Ken  | Chun Li | Zangief | Dhalsim | Sagat  | M.Bison |
Input

the list of game characters in a 2x6 grid;
the initial position of the selection cursor (top-left is (0,0));
a list of moves of the selection cursor (which are up, down, left, right);
Output

the list of characters who have been hovered by the selection cursor after all the moves (ordered and with repetition, all the ones after a move, wether successful or not, see tests);
Rules

Selection cursor is circular horizontally but not vertically!

As you might remember from the game, the selection cursor rotates horizontally but not vertically; that means that if I'm in the leftmost and I try to go left again I'll get to the rightmost (examples: from Ryu to Vega, from Ken to M.Bison) and vice versa from rightmost to leftmost.

Instead, if I try to go further up from the upmost or further down from the downmost, I'll just stay where I am located (examples: you can't go lower than lowest row: Ken, Chun Li, Zangief, Dhalsim, Sagat and M.Bison in the above image; you can't go upper than highest row: Ryu, E.Honda, Blanka, Guile, Balrog and Vega in the above image).

Test

For this easy version the fighters grid layout and the initial position will always be the same in all tests, only the list of moves change.

Notice : changing some of the input data might not help you.

Examples

1.

fighters = [
    ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
    ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
]
initial_position = (0,0)
moves = ['up', 'left', 'right', 'left', 'left']
then I should get:

['Ryu', 'Vega', 'Ryu', 'Vega', 'Balrog']
as the characters I've been hovering with the selection cursor during my moves. Notice: Ryu is the first just because it "fails" the first up See test cases for more examples.

2.

fighters = [
    ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
    ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
]
initial_position = (0,0)
moves = ['right', 'down', 'left', 'left', 'left', 'left', 'right']
Result:

['E.Honda', 'Chun Li', 'Ken', 'M.Bison', 'Sagat', 'Dhalsim', 'Sagat']



function streetFighterSelection(fighters, position, moves){
  var place = position
  var final = []
  for (var i = 0; i < moves.length; i++) {
    if (moves[i] === "up") {
      if (place[0] === 1) {
        place[0] = 0
      }
    } else if (moves[i] === "down") {
      if (place[0] === 0) {
        place[0] = 1
      }
    } else if (moves[i] === "left") {
      if (place[1] === 0) {
        place[1] = (fighters[place[0]].length - 1)
      } else {
        place[1] -= 1
      }
    } else if (moves[i] === "right") {
      if (place[1] === fighters[place[0]].length - 1) {
        place[1] = 0
      } else {
        place[1] += 1
      }
    }
    final.push(fighters[place[0]][place[1]])
  }
  return final
}
Solution:

function streetFighterSelection(fighters, position, moves){
  return "";
}
Sample Tests:

fighters = [
  ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
  ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
];
​
moves = ['up', 'left', 'right', 'left', 'left'];
describe("Solution", function(){
  it("should work with few moves", function(){
    Test.assertSimilar(streetFighterSelection(fighters, [0,0], moves),['Ryu', 'Vega', 'Ryu', 'Vega', 'Balrog']);
  });
});
​
moves = [];
describe("Solution", function(){
  it("should work with no selection cursor moves", function(){
    Test.assertSimilar(streetFighterSelection(fighters, [0,0], moves),[]);
  });
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT



The input is a string str of digits. Cut the string into chunks (a chunk here is a substring of the initial string) of size sz (ignore the last chunk if its size is less than sz).

If a chunk represents an integer such as the sum of the cubes of its digits is divisible by 2, reverse that chunk; otherwise rotate it to the left by one position. Put together these modified chunks and return the result as a string.

If

sz is <= 0 or if str is empty return ""
sz is greater (>) than the length of str it is impossible to take a chunk of size sz hence return "".
Examples:
revrot("123456987654", 6) --> "234561876549"
revrot("123456987653", 6) --> "234561356789"
revrot("66443875", 4) --> "44668753"
revrot("66443875", 8) --> "64438756"
revrot("664438769", 8) --> "67834466"
revrot("123456779", 8) --> "23456771"
revrot("", 8) --> ""
revrot("123456779", 0) --> "" 
revrot("563000655734469485", 4) --> "0365065073456944"


def revrot(str, sz)
  if sz <= 0 || str.length == 0 || sz > str.length
    return ""
  else
    substrings = []
    j = 0
    until j > str.length - sz
      sub = ""
      i = 0
      until i > sz - 1
        sub += str[j+i]
      i += 1
      end
      substrings << sub
    j += sz
    end
    final = ""
    substrings.each do |k|
      total = 0
      i = 0
      until i > k.length - 1
        total += (k[i].to_i * k[i].to_i)
      i += 1
      end
      if total % 2 == 0
        final += k.reverse
      else
        p (k[1..-1] + k[0])
        p final
        final += (k[1..-1] + k[0])
      end
    end
    final
  end
end
Solution:

function revrot(str, sz) {
    // your code
}
Sample Tests:

function testing(actual, expected) {
    Test.assertEquals(actual, expected)
}
​
Test.describe("revrot",function() {
    Test.it("Basic tests",function() {    
        testing(revrot("1234", 0), "")
        testing(revrot("", 0), "")
        testing(revrot("1234", 5), "")
        s = "733049910872815764"
        testing(revrot(s, 5), "330479108928157")
})})
SKIPUNLOCK SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT




There is an array with some numbers. All numbers are equal except for one. Try to find it!

findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
It’s guaranteed that array contains more than 3 numbers.

The tests contain some very huge arrays, so think about performance.

This is the first kata in series:

Find the unique number (this kata)
Find the unique string
Find The Unique


function findUniq(arr) {
  array = [];
  array.push(arr[0]);
  array.push(arr[1]);
  for(i=2;i<arr.length;i++) {
    if (arr[i] === array[0] && arr[i] != array[1]) {
      return array[1];
    } else if (arr[i] === array[1] && arr[i] != array[0]) {
      return array[0];
    } else if (arr[i] != array[0] && arr[i] != array[1]) {
      return arr[i];
    }
  }
}


Polycarpus works as a DJ in the best Berland nightclub, and he often uses dubstep music in his performance. Recently, he has decided to take a couple of old songs and make dubstep remixes from them.

Let's assume that a song consists of some number of words. To make the dubstep remix of this song, Polycarpus inserts a certain number of words "WUB" before the first word of the song (the number may be zero), after the last word (the number may be zero), and between words (at least one between any pair of neighbouring words), and then the boy glues together all the words, including "WUB", in one string and plays the song at the club.

For example, a song with words "I AM X" can transform into a dubstep remix as "WUBWUBIWUBAMWUBWUBX" and cannot transform into "WUBWUBIAMWUBX".

Recently, Jonny has heard Polycarpus's new dubstep track, but since he isn't into modern music, he decided to find out what was the initial song that Polycarpus remixed. Help Jonny restore the original song.

Input
The input consists of a single non-empty string, consisting only of uppercase English letters, the string's length doesn't exceed 200 characters

Output
Return the words of the initial song that Polycarpus used to make a dubsteb remix. Separate the words with a space.

Examples
songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB")
  // =>  WE ARE THE CHAMPIONS MY FRIEND


  def song_decoder(song)
  split = song.split("WUB") - [""]
  split.join(" ")
end



Enough is enough!
Alice and Bob were on a holiday. Both of them took many pictures of the places they've been, and now they want to show Charlie their entire collection. However, Charlie doesn't like this sessions, since the motive usually repeats. He isn't fond of seeing the Eiffel tower 40 times. He tells them that he will only sit during the session if they show the same motive at most N times. Luckily, Alice and Bob are able to encode the motive as a number. Can you help them to remove numbers such that their list contains each number only up to N times, without changing the order?

Task
Given a list lst and a number N, create a new list that contains each number of lst at most N times without reordering. For example if N = 2, and the input is [1,2,3,1,2,1,2,3], you take [1,2,3,1,2], drop the next [1,2] since this would lead to 1 and 2 being in the result 3 times, and then take 3, which leads to [1,2,3,1,2,3].

Example
  deleteNth ([1,1,1,1],2) // return [1,1]

  deleteNth ([20,37,20,21],1) // return [20,37,21]


  function deleteNth(arr,n){
  count = {}
  final = []
  for(i=0; i<arr.length; i++) {
    if (count[arr[i]]) {
      count[arr[i]] += 1
    } else {
      count[arr[i]] = 1
    }
    if (count[arr[i]] <= n) {
      final.push(arr[i])
    }
  }
  return final
}


Given a string of words, you need to find the highest scoring word.

Each letter of a word scores points according to it's position in the alphabet: a = 1, b = 2, c = 3 etc.

You need to return the highest scoring word as a string.

If two words score the same, return the word that appears earliest in the original string.

All letters will be lowercase and all inputs will be valid.


def high(x)
  alphabet = "abcdefghijklmnopqrstuvwxyz"
  highest = ["", 0]
  split = x.split(" ")
  split.each do |k|
    count = 0
    i = 0
    until i > k.length
      j = 0
      until j > alphabet.length
        if k[i] == alphabet[j]
          count += j + 1
        end
      j += 1
      end
      if count > highest[1]
        highest = [k, count]
      end
    i += 1
    end
  end
  return highest[0]
end



The idea for this Kata came from 9gag today.here

You'll have to translate a string to Pilot's alphabet (NATO phonetic alphabet) wiki.

Like this:

Input: If you can read

Output: India Foxtrot Yankee Oscar Uniform Charlie Alfa November Romeo Echo Alfa Delta

Some notes

Keep the punctuation, and remove the spaces.
Use Xray without dash or space.
Reference

alt text

You can use the NATO hash with the alphabet



def to_nato(words)
	alphabet = { "A" => "Alfa", "B" => "Bravo", "C" => "Charlie", "D" => "Delta", "E" => "Echo", "F" => "Foxtrot", "G" => "Golf",
"H"	=> "Hotel",
"I" => "India",
"J"	=> "Juliett",
"K"	=> "Kilo",
"L"	=> "Lima",
"M"	=> "Mike",
"N"	=> "November",
"O"	=> "Oscar",
"P"	=> "Papa",
"Q"	=> "Quebec",
"R"	=> "Romeo",
"S"	=> "Sierra",
"T"	=> "Tango",
"U"	=> "Uniform",
"V"	=> "Victor",
"W"	=> "Whiskey",
"X"	=> "Xray",
"Y"	=> "Yankee",
"Z" => "Zulu" }

  final = ""
  i = 0
  until i > words.length - 1
    if words[i] != " "
      if alphabet[words[i].upcase]
        final += alphabet[words[i].upcase] + " "
      else
        final += words[i] + " "
      end
    end
  i += 1
  end
  if final[-1] == " "
    return final[0..-2]
  else
    return final
  end
end
Solution:

function to_nato(words) {
  // Go code
}
Sample Tests:

// TODO: Replace examples and use TDD development by writing your own tests
​
// These are some CW specific test methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)
​
// NodeJS assert is also automatically required for you.
//    assert(true)
//    assert.strictEqual({a: 1}, {a: 1})
//    assert.deepEqual({a: [{b: 1}]}, {a: [{b: 1}]})
​
// You can also use Chai (http://chaijs.com/) by requiring it yourself
// var expect = require("chai").expect;
// var assert = require("chai").assert;
// require("chai").should();
SKIPUNLOCK SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT



There is a queue for the self-checkout tills at the supermarket. Your task is write a function to calculate the total time required for all the customers to check out!

The function has two input variables:

customers: an array (list in python) of positive integers representing the queue. Each integer represents a customer, and its value is the amount of time they require to check out.
n: a positive integer, the number of checkout tills.
The function should return an integer, the total time required.

EDIT: A lot of people have been confused in the comments. To try to prevent any more confusion:

There is only ONE queue, and
The order of the queue NEVER changes, and
Assume that the front person in the queue (i.e. the first element in the array/list) proceeds to a till as soon as it becomes free.
The diagram on the wiki page I linked to at the bottom of the description may be useful.
So, for example:

queueTime([5,3,4], 1)
// should return 12
// because when n=1, the total time is just the sum of the times

queueTime([10,2,3,3], 2)
// should return 10
// because here n=2 and the 2nd, 3rd, and 4th people in the 
// queue finish before the 1st person has finished.

queueTime([2,3,10], 2)
// should return 12
N.B. You should assume that all the test input will be valid, as specified above.

P.S. The situation in this kata can be likened to the more-computer-science-related idea of a thread pool, with relation to running multiple processes at the same time: https://en.wikipedia.org/wiki/Thread_pool


def queue_time(customers, n)
  total = 0
  until customers.length == 0
    if customers.length >= n
      amount = n
    else
      amount = customers.length
    end
    i = 0
    until i > amount - 1
      if customers[i]
        customers[i] -= 1
      end
    i += 1
    end
    customers.delete(0)
    total += 1
  end
  return total
end


Write Number in Expanded Form
You will be given a number and you will need to return it as a string in Expanded Form. For example:

expandedForm(12); // Should return '10 + 2'
expandedForm(42); // Should return '40 + 2'
expandedForm(70304); // Should return '70000 + 300 + 4'
NOTE: All numbers will be whole numbers greater than 0.

If you liked this kata, check out part 2!!



def expanded_form(num)
  use_me = num.to_s
  i = 0
  final = ""
  until i > use_me.length - 1
    if use_me[i] != "0"
      final += use_me[i]
        j = i + 1
        until j > use_me.length - 1
          final += "0"
        j += 1
        end
      final += " + "
    end
  i += 1
  end
  final[0..-4]
end



A string is considered to be in title case if each word in the string is either (a) capitalised (that is, only the first letter of the word is in upper case) or (b) considered to be an exception and put entirely into lower case unless it is the first word, which is always capitalised.

Write a function that will convert a string into title case, given an optional list of exceptions (minor words). The list of minor words will be given as a string with each word separated by a space. Your function should ignore the case of the minor words string -- it should behave in the same way even if the case of the minor word string is changed.

###Arguments (Haskell)

First argument: space-delimited list of minor words that must always be lowercase except for the first word in the string.
Second argument: the original string to be converted.
###Arguments (Other languages)

First argument (required): the original string to be converted.
Second argument (optional): space-delimited list of minor words that must always be lowercase except for the first word in the string. The JavaScript/CoffeeScript tests will pass undefined when this argument is unused.
###Example

titleCase('a clash of KINGS', 'a an the of') // should return: 'A Clash of Kings'
titleCase('THE WIND IN THE WILLOWS', 'The In') // should return: 'The Wind in the Willows'
titleCase('the quick brown fox') // should return: 'The Quick Brown Fox'


function titleCase(title, minorWords) {
  if (title === "") {
    return ""
  }
  final = ""
  if (minorWords) {
    notMe = minorWords.toLowerCase().split(" ")
  } else {
    notMe = []
  }
  arrayed = title.toLowerCase().split(" ")
  for (i=0; i<arrayed.length; i++) {
    if (i===0) {
      final += arrayed[i][0].toUpperCase() + arrayed[i].substring(1, arrayed[i].length) + " "
    } else {
      counter = 0
      for (j=0; j<notMe.length; j++) {
        if (notMe[j] === arrayed[i]) {
          counter += 1
        }
      }
      if (counter === 0) {
        final += arrayed[i][0].toUpperCase() + arrayed[i].substring(1, arrayed[i].length) + " "
      } else {
        final += arrayed[i] + " "
      }
    }
  }
  return final.substring(0, final.length-1)
}



You have to extract a portion of the file name as follows:

Assume it will start with date represented as long number
Followed by an underscore
Youll have then a filename with an extension
it will always have an extra extension at the end
Inputs:
1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION

1_This_is_an_otherExample.mpg.OTHEREXTENSIONadasdassdassds34

1231231223123131_myFile.tar.gz2
Outputs
FILE_NAME.EXTENSION

This_is_an_otherExample.mpg

myFile.tar
The recommend way to solve it is using RegEx and specifically groups.


class FileNameExtractor
    def self.extract_file_name(dirtyFileName)
       indices = []
       i = 0
       dots = 0
       date = true
       until i > dirtyFileName.length
         if date == true && dirtyFileName[i] == "_"
           date = false
           indices.push(i)
         end
         if dots == 1 && dirtyFileName[i] == "."
           dots += 1
           indices.push(i)
         end
         if dots == 0 && dirtyFileName[i] == "."
           dots += 1
         end
       i += 1
       end
       return dirtyFileName[indices[0] + 1..indices[1] - 1]
    end
end
Solution:

class FileNameExtractor {
    static extractFileName (dirtyFileName) {
        return "show me the code!";
    }
}
Sample Tests:

Test.assertEquals(FileNameExtractor.extractFileName("1_FILE_NAME.EXTENSION.OTHEREXTENSIONadasdassdassds34"),"FILE_NAME.EXTENSION");
Test.assertEquals(FileNameExtractor.extractFileName("1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION"),"FILE_NAME.EXTENSION");
SKIPUNLOCK SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT



"The Shell Game" involves three shells/cups/etc upturned on a playing surface, with a ball placed underneath one of them. The shells are then rapidly swapped round, and the game involves trying to track the swaps and, once they are complete, identifying the shell containing the ball.

This is usually a con, but you can assume this particular game is fair...

Your task is as follows. Given the shell that the ball starts under, and list of swaps, return the location of the ball at the end. All shells are indexed by the position they are in at the time.

For example, given the starting position 0 and the swap sequence [(0, 1), (1, 2), (1, 0)]:

The first swap moves the ball from 0 to 1
The second swap moves the ball from 1 to 2
The final swap doesn't affect the position of the ball.

So

swaps = [[0,1], [1,2], [1, 0]]
find_the_ball(0, swaps) == 2
There aren't necessarily only three cups in this game, but there will be at least two. You can assume all swaps are valid, and involve two distinct indices.



find_the_ball=function(start,swaps){
  var position = start
  for (var i = 0; i < swaps.length; i++) {
    if (swaps[i][0] === position) {
      position = swaps[i][1]
    } else if (swaps[i][1] === position) {
      position = swaps[i][0]
    }
  }
  return position
}


Description:
Each exclamation mark weight is 2; Each question mark weight is 3. Put two string left and right to the balance, Are they balanced?

If the left side is more heavy, return "Left"; If the right side is more heavy, return "Right"; If they are balanced, return "Balance".

Examples
balance("!!","??") === "Right"
balance("!??","?!!") === "Left"
balance("!?!!","?!?") === "Left"
balance("!!???!????","??!!?!!!!!!!") === "Balance"
Note
Please don't post issue about difficulty or duplicate.



function balance(left,right){
  var leftTotal = 0
  var rightTotal = 0
  for (var i = 0; i < left.length; i++) {
    if (left[i] === "!") {
      leftTotal += 2
    } else if (left[i] === "?") {
      leftTotal += 3
    }
  }
  for (var j = 0; j < right.length; j++) {
    if (right[j] === "!") {
      rightTotal += 2
    } else if (right[j] === "?") {
      rightTotal += 3
    }
  }
  if (rightTotal > leftTotal) {
    return "Right"
  } else if (leftTotal > rightTotal) {
    return "Left"
  } else {
    return "Balance"
  }
}


Introduction
Ka ka ka cypher is a cypher used by small children in some country. When a girl wants to pass something to the other girls and there are some boys nearby, she can use Ka cypher. So only the other girls are able to understand her. 
She speaks using KA, ie.: 
ka thi ka s ka bo ka y ka i ka s ka u ka gly what simply means this boy is ugly. 

Task
Write a function KaCokadekaMe (ka_co_ka_de_ka_me in Python) that accepts a string word and returns encoded message using ka cypher. 

Our rules:

The encoded word should start from ka.
The ka goes after vowel (a,e,i,o,u)
When there is multiple vowels together, the ka goes only after the last vowel
When the word is finished by a vowel, do not add the ka after
Input/Output
The word string consists of only lowercase and uppercase characters. There is only 1 word to convert - no white spaces.

Example
KaCokadekaMe("a");  //=> "kaa"
KaCokadekaMe("ka");  //=> "kaka"
KaCokadekaMe("aa"); //=> "kaaa"  
KaCokadekaMe("Abbaa"); //=> kaAkabbaa
KaCokadekaMe("maintenance"); //=> kamaikantekanakance
KaCokadekaMe("Woodie"); //=> kaWookadie
KacokadekaMe("Incomprehensibilities"); //=> kaIkancokamprekahekansikabikalikatiekas
Remark
Ka cypher's country residents, please don't hate me for simplifying the way how we divide the words into "syllables" in the Kata. I don't want to make it too hard for other nations ;-P




def kacokadekame(word)
  final = "ka"
  i = 0
  until i > word.length - 1
    if (word[i].downcase == "a" || word[i].downcase == "e" || word[i].downcase == "i" || word[i].downcase == "o" || word[i].downcase == "u") && (i != word.length - 1)
      if word[i+1].downcase != "a" && word[i+1].downcase != "e" && word[i+1].downcase != "i" && word[i+1].downcase != "o" && word[i+1].downcase != "u"
        final += word[i] + "ka"
      else
        final += word[i]
      end
    else
      final += word[i]
    end
  i += 1
  end
  return final
end


Modify the kebabize function so that it converts a camel case string into a kebab case.

kebabize('camelsHaveThreeHumps') // camels-have-three-humps
kebabize('camelsHave3Humps') // camels-have-humps
Notes:

the returned string should only contain lowercase letters


def kebabize(str)
  final = ""
  i = 0
  until i > str.length-1
    if str[i] == "0" || str[i] == "1" || str[i] == "2" || str[i] == "3" || str[i] == "4" || str[i] == "5" || str[i] == "6" || str[i] == "7" || str[i] == "8" || str[i] == "9"
      banana = 1
    elsif str[i].upcase == str[i]
      final += "-" + str[i].downcase
    else
      final += str[i]
    end
  i += 1  
  end
  if final[0] == "-"
    final = final[1..-1]
  elsif final[-1] == "-"
    final = final[0..-2]
  end
  return final
end


Given a string, return a new string that has transformed based on the input:

Change case of every character, ie. lower case to upper case, upper case to lower case.
Reverse the order of words from the input.
For example:
stringTransformer('Example Input')/string_transformer("Example Input") (depending on the language you are completing the Kata in) should return 'iNPUT eXAMPLE'

You may assume the input only contain English alphabet and spaces.


function stringTransformer(str) {
  var split = str.split(" ")
  var final = []
  for (var i = split.length-1; i >= 0; i--) {
    var substring = ""
    for (var j = 0; j < split[i].length; j++) {
      if (split[i][j].toLowerCase() === split[i][j]) {
        substring += split[i][j].toUpperCase()
      } else if (split[i][j].toUpperCase() === split[i][j]) {
        substring += split[i][j].toLowerCase()
      }
    }
    final.push(substring)
  }
  return final.join(" ")
}



The depth of an integer n is defined to be how many multiples of n it is necessary to compute before all 10 digits have appeared at least once in some multiple.

example:

let see n=42

Multiple         value         digits     comment
42*1              42            2,4 
42*2              84             8         4 existed
42*3              126           1,6        2 existed
42*4              168            -         all existed
42*5              210            0         2,1 existed
42*6              252            5         2 existed
42*7              294            9         2,4 existed
42*8              336            3         6 existed 
42*9              378            7         3,8 existed
Looking at the above table under digits column you can find all the digits from 0 to 9, Hence it required 9 multiples of 42 to get all the digits. So the depth of 42 is 9. Write a function named computeDepth which computes the depth of its integer argument.Only positive numbers greater than zero will be passed as an input.




def compute_depth(n)
  end_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  nums = []
  i = 1
  until nums.uniq.sort == end_array
    iteration = (n * i).to_s.split("")
    iteration.each do |k|
      nums << k
    end
  i += 1
  end
  return i - 1
end



Sam is an avid collector of numbers. Every time he finds a new number he throws it on the top of his number-pile. Help Sam organise his collection so he can take it to the International Number Collectors Conference in Cologne.

Given an array of numbers, your function should return an array of arrays, where each subarray contains all the duplicates of a particular number. Subarrays should be in the same order as the first occurence of the number they contain:

group([3, 2, 6, 2, 1, 3])
>>> [[3, 3], [2, 2], [6], [1]]
Assume the input is always going to be an array of numbers. If the input is an empty array, an empty array should be returned.


def group(arr)
  if arr == []
    return []
  end
  count = {}
  i = 0
  until i > arr.length - 1
    if count[arr[i]]
      count[arr[i]] += 1
    else
      count[arr[i]] = 1
    end
  i += 1
  end
  final = []
  count.each do |num, amount|
  temp = []
    amount.times do |k|
      temp << num
    end
    final << temp
  end
  return final
end



A traveling salesman has to visit clients. He got each client's address e.g. "432 Main Long Road St. Louisville OH 43071" as a list.

The basic zipcode format usually consists of two capital letters followed by a white space and five digits. The list of clients to visit was given as a string of all addresses, each separated from the others by a comma, e.g. :

"123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432".

To ease his travel he wants to group the list by zipcode.

Task
The function travel will take two parameters r (addresses' list of all clients' as a string) and zipcode and returns a string in the following format:

zipcode:street and town,street and town,.../house number,house number,...

The street numbers must be in the same order as the streets where they belong.

If a given zipcode doesn't exist in the list of clients' addresses return "zipcode:/"

Examples
r = "123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432"

travel(r, "OH 43071") --> "OH 43071:Main Street St. Louisville,Main Long Road St. Louisville/123,432"

travel(r, "NY 56432") --> "NY 56432:High Street Pollocksville/786"

travel(r, "NY 5643") --> "NY 5643:/"
Note for Elixir:
In Elixir the empty addresses' input is an empty list, not an empty string.

Note:
You can see a few addresses and zipcodes in the test cases.


def travel(r, zipcode)
  final = zipcode + ":"
  numbers = "/"
  split = r.split(",")
  i = 0
  until i > split.length - 1
    if zipcode == split[i][-8..-1]
      j = 0
      until j > split[i].length
        if split[i][j] == " "
          post_numbers = j
          j = split[i].length
        end
      j += 1
      end
      if final.length > 9
        final += ","
      end
      if numbers.length > 1
        numbers += ","
      end
      final += split[i][post_numbers+1..-10]
      numbers += split[i][0..post_numbers-1]
    end
  i += 1
  end
  final += numbers
  return final
end


Mothers arranged dance party for children in school.On that party there are only mothers and their children.All are having great fun on dancing floor when suddenly all lights went out.Its dark night and no one can see eachother.But you were flying nearby and you can see in the dark and have ability to teleport people anywhere you want.

Legend:
-Uppercase letters stands for mothers,lowercase stand for their children. I.E "A" mothers children are "aaaa".
-Function input:String contain only letters,Uppercase letters are unique.
Task:
Place all people in alphabetical order where Mothers are followed by their children.I.E "aAbaBb" => "AaaBbb".


function findChildren(dancingBrigade){
  upper = ""
  lower = ""
  for (i=0; i<dancingBrigade.length; i++) {
    if (dancingBrigade[i].toUpperCase() === dancingBrigade[i]) {
      upper += dancingBrigade[i]
    } else if (dancingBrigade[i].toLowerCase() === dancingBrigade[i]) {
      lower += dancingBrigade[i]
    }
  }
  upperSorted = upper.split("").sort().join("")
  lowerSorted = lower.split("").sort().join("")
  for (i=0; i<upperSorted.length; i++) {
    for (j=0; j<lowerSorted.length; j++) {
      if (upperSorted[i].toLowerCase() === lowerSorted[j]) {
        lowerSorted = lowerSorted.substring(0, j) + upperSorted[i] + lowerSorted.substring(j, lowerSorted.length)
        j = lowerSorted.length
      }
    }
  }
  return lowerSorted
};



Do you speak retsec?
You and your friends want to play undercover agents. In order to exchange your secret messages, you've come up with the following system: you take the word, cut it in half, and place the first half behind the latter. If the word has an uneven number of characters, you leave the middle at its previous place:

retsec examples

That way, you'll be able to exchange your messages in private.

Task
You're given a single word. Your task is to swap the halves. If the word has an uneven length, leave the character in the middle at that position and swap the chunks around it.

Examples
reverseByCenter("agent") == "nteag" // center character is e

reverseByCenter("secret")  == "retsec" // no center character
Remarks
Don't use this to actually exchange messages in private.



function reverseByCenter(s){
  final = ""
  for (i=Math.ceil(s.length/2); i<s.length; i++) {
    final += s[i]
  }
  if (s.length % 2 === 1) {
    final += s[Math.floor(s.length/2)]
  }
  for (i=0; i<Math.floor(s.length/2); i++) {
    final += s[i]
  }
  return final
}



The aim of this Kata is to write a function which will reverse the case of all consecutive duplicate letters in a string. That is, any letters that occur one after the other and are identical.

If the duplicate letters are lowercase then they must be set to uppercase, and if they are uppercase then they need to be changed to lowercase.

Examples:

reverseCase("puzzles")    Expected Result: "puZZles"
reverseCase("massive")    Expected Result: "maSSive"
reverseCase("LITTLE")     Expected Result: "LIttLE"
reverseCase("shhh")       Expected Result: "sHHH"
Arguments passed will include only alphabetical letters A–Z or a–z.




def reverse(str)
  final = ""
  i = 0
  until i > str.length-1
    if str[i] == str[i+1] || str[i] == str[i-1]
      if str[i].upcase == str[i]
        final += str[i].downcase
      elsif str[i].downcase == str[i]
        final += str[i].upcase
      end
    else
      final += str[i]
    end
  i += 1
  end
  return final
end


Create a function that takes a string as a parameter and does the following, in this order:

replaces every letter with the letter following it in the alphabet (see note below)
makes any vowels capital
makes any consonants lower case
Note: the alphabet should wrap around, so Z becomes A

So, for example the string "Cat30" would return "dbU30" (Cat30 --> Dbu30 --> dbU30)


def changer(string)
  final = ""
  alphabet = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ"
  i = 0
  until i > string.length - 1
    number = true
    j = 0
    until j > alphabet.length - 1
      if string[i] == alphabet[j]
        if alphabet[j+1].upcase == "A" || alphabet[j+1].upcase == "E" || alphabet[j+1].upcase == "I" || alphabet[j+1].upcase == "O" || alphabet[j+1].upcase == "U"
          final += alphabet[j + 1].upcase
          j = alphabet.length
          number = false
        else
          final += alphabet[j + 1].downcase
          j = alphabet.length
          number = false
        end
      end
    j += 1
    end
    if number == true 
      final += string[i]
    end
  i += 1
  end
  return final
end


Write a function that takes an array of numbers (integers for the tests) and a target number. It should find two different items in the array that, when added together, give the target value. The indices of these items should then be returned in an array like so: [index1, index2].

For the purposes of this kata, some tests may have multiple answers; any valid solutions will be accepted.

The input will always be valid (numbers will be an array of length 2 or greater, and all of the items will be numbers; target will always be the sum of two different items from that array).

Based on: http://oj.leetcode.com/problems/two-sum/


function twoSum(numbers, target) {
  final = []
  for (i=0; i<numbers.length; i++) {
    for (j=i+1; j<numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        final.push(i)
        final.push(j)
        return final
      }
    }
  }
}


In an attempt to boost sales, the manager of the pizzeria you work at has devised a pizza rewards system: if you already made at least 5 orders of at least 20 dollars, you get a free 12 inch pizza with 3 toppings of your choice.

However, the rewards system may change in the future. Your manager wants you to implement a function that, given a dictionary of customers, a minimum number of orders and a minimum order value, returns a set of the customers who are eligible for a reward.

Customers in the dictionary are represented as:

{ 'customerName' : [list_of_order_values_as_integers] }
See example test case for more details.


def pizza_rewards(customers, min_orders, min_price)
  final = []
  customers.each do |name, order|
    count = 0
    order.each do |k|
      if k >= min_price
        count += 1
      end
    end
    if count >= min_orders
      final << name
    end
  end
  return final
end


When no more interesting kata can be resolved, I just choose to create the new kata, to solve their own, to enjoy the process --myjinxin2015 said

Description:
Given an array arr that contains some integers(positive, negative or 0), and a range list such as [[start1,end1],[start2,end2],...], start and end are the index of arr and start always less than end. Your task is to calculate the sum value of each range (start index and end index are both inclusive), and return the maximum sum value.

For example:

 Given arr = [1,-2,3,4,-5,-4,3,2,1], 
       range = [[1,3],[0,4],[6,8]]
 should return 6

 calculation process:
 range[1,3] = arr[1]+arr[2]+arr[3] = 5
 range[0,4] = arr[0]+arr[1]+arr[2]+arr[3]+arr[4] = 1
 range[6,8] = arr[6]+arr[7]+arr[8] = 6
 So the maximum sum value is 6
Note:
arr/$a always has at least 5 elements;
range/$range/ranges always has at least 1 element;
All inputs are valid;
This is a simple version, if you want some challenge, please try the challenge version.
Some Examples
 maxSum([1,-2,3,4,-5,-4,3,2,1],[[1,3],[0,4],[6,8]]) === 6
 maxSum([1,-2,3,4,-5,-4,3,2,1],[[1,3]]) === 5
 maxSum([1,-2,3,4,-5,-4,3,2,1],[[1,4],[2,5]]) === 0



 Dave has a lot of data he is required to apply filters to, which are simple enough, but he wants a shorter way of doing so.

He wants the following functions to work as expected:

even    // [1,2,3,4,5].even() should return [2,4]
odd     // [1,2,3,4,5].odd() should return [1,3,5]
under   // [1,2,3,4,5].under(4) should return [1,2,3]
over    // [1,2,3,4,5].over(4) should return [5]
inRange // [1,2,3,4,5].inRange(1,3) should return [1,2,3]
They should also work when used together, for example:

[1,2,18,19,20,21,22,30,40,50,100].even().inRange(18,30) // should return [18, 20, 22, 30]
And finally the filters should only accept integer values from an array, for example:

["a", 1, "b", 300, "x", "q", 63, 122, 181, "z", 0.83, 0.11].even() // should return [300, 122]


Array.prototype.even = function(){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] % 2 === 0) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.odd = function(){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] % 2 === 1) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.under = function(x){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] < x) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.over = function(x){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] > x) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.inRange = function(min,max){
  final = []
  for (i=0; i<this.length; i++) {
    if ((min <= this[i] && this[i] <= max) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}
Solution:

Array.prototype.even = function(){
  // ...
}
​
Array.prototype.odd = function(){
  // ...
}
​
Array.prototype.under = function(x){
  // ...
}
​
Array.prototype.over = function(x){
  // ...
}
​
Array.prototype.inRange = function(min,max){
  // ...
}
​
Sample Tests:

Test.assertSimilar([1,2,3,4,5].even(),[2,4])
Test.assertSimilar([1,2,3,4,5].odd() ,[1,3,5])
Test.assertSimilar([1,2,3,4,5].under(4),[1,2,3])
Test.assertSimilar([1,2,3,4,5].over(4) ,[5])
Test.assertSimilar([1,2,3,4,5].inRange(1,3),[1,2,3])
​
Test.assertSimilar([1,2,18,19,20,21,22,30,40,50,100].even().inRange(18,30), [18, 20, 22, 30])
Test.assertSimilar(["a", 1, "b", 300, "x", "q", 63, 122, 181, "z", 0.83, 0.11].even(),[300, 122])
​
​
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT




Task
Write a function that accepts msg string and returns local tops of string from the highest to the lowest.
The string's tops are from displaying the string in the below way:

                                                      3 
                              p                     2   4
            g               o   q                 1
  b       f   h           n       r             z 
a   c   e       i       m          s          y
      d           j   l             t       x
                    k                 u   w 
                                        v
The next top is always 1 character higher than the previous one. For the above example, the solution for the abcdefghijklmnopqrstuvwxyz1234 input string is 3pgb.

When the msg string is empty, return an empty string.
The input strings may be very long. Make sure your solution has good performance.
Check the test cases for more samples.


function tops(msg) {
   var recent = [0, 0]
   var current = [0]
   var final = ""
   var direction = "up"
   for (var i = 0; i < msg.length; i++) {
     if (current[0] > recent[0]) {
       final += msg[i]
       recent[0] = current[0]
       direction = "down"
     } else if (current[0] < recent[1]) {
       recent[1] = current[0]
       direction = "up"
     }
     if (direction === "up") {
       current[0] += 1
     } else if (direction === "down") {
       current[0] -= 1
     }
   }
   return final.split("").reverse().join("")
}


Task:
Given n representing the number of floors build a beautiful multi-million dollar mansions like the ones in the example below:

/*
     /\
    /  \
   /    \
  /______\  // number of floors 3
  |      |
  |      |
  |______|

     /\
    /  \
   /____\
   |    |   // 2 floors
   |____|

     /\
    /__\    // 1 floor
    |__|

*/


Note: whitespace should be preserved on both sides of the roof. Number of floors will go up to 30. There will be no tests with invalid input.
If you manage to complete it, you can try a harder version here

Good luck!


function myCrib(n) {
  var final = ""
  for (var i = n; i > 0; i--) {
    final += (" ".repeat(i)) + "/" + (" ".repeat(n-i)) + (" ".repeat(n-i)) + "\\" + (" ".repeat(i)) + "\n"
  }
  final += "/" + ("_".repeat(n*2)) + "\\" + "\n"
  for (var j = n; j > 1; j--) {
    final += "|" + (" ".repeat(n*2)) + "|" + "\n"
  }
  final += "|" + ("_".repeat(n*2)) + "|"
  return final
}


A square of squares
You like building blocks. You especially like building blocks that are squares. And what you even like more, is to arrange them into a square of square building blocks!

However, sometimes, you can't arrange them into a square. Instead, you end up with an ordinary rectangle! Those blasted things! If you just had a way to know, whether you're currently working in vain… Wait! That's it! You just have to check if your number of building blocks is a perfect square.

Task
Given an integral number, determine if it's a square number:

In mathematics, a square number or perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself.

The tests will always use some integral number, so don't worry about that in dynamic typed languages.

Examples
isSquare(-1) // => false
isSquare( 3) // => false
isSquare( 4) // => true
isSquare(25) // => true
isSquare(26) // => false



var isSquare = function(n){
  return Number.isInteger(Math.sqrt(n))
}


Given an array of numbers, determine whether the sum of all of the numbers is odd or even.

Give your answer in string format as 'odd' or 'even'.

If the input array is empty consider it as: [0] (array with a zero).

Example:

oddOrEven([0]) returns "even"
oddOrEven([2, 5, 34, 6]) returns "odd"
oddOrEven([0, -1, -5]) returns "even"
Have fun!


def odd_or_even(array)
  total = 0
  i = 0
  until i > array.length - 1
    total += array[i]
  i += 1
  end
  if total % 2 == 0
    return "even"
  else
    return "odd"
  end
end


Return the number (count) of vowels in the given string.

We will consider a, e, i, o, and u as vowels for this Kata.

The input string will only consist of lower case letters and/or spaces.


def getCount(inputStr)
  str_to_count = ""
  count = 0
  while count < inputStr.length
    if inputStr[count] == "a" || inputStr[count] == "e" || inputStr[count] == "i" || inputStr[count] == "o" || inputStr[count] == "u"
      str_to_count << inputStr[count]
    end
    count += 1
  end
  return str_to_count.length
end
def getCount(inputStr)
  arr_to_count = []
  word = inputStr.split("")
  word.each do |i|
    if i == "a"
      arr_to_count << "a"
    elsif i == "e"
      arr_to_count << "e"
    elsif i == "i"
      arr_to_count << "i"
    elsif i == "o"
      arr_to_count << "o"
    elsif i == "u"
      arr_to_count << "u"
    end
  end
  return arr_to_count.length
end


This time no story, no theory. The examples below show you how to write function accum:

Examples:

accum("abcd");    // "A-Bb-Ccc-Dddd"
accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt");    // "C-Ww-Aaa-Tttt"
The parameter of accum is a string which includes only letters from a..z and A..Z.


def accum(s)
	final = ""
  i = 0
  until i > s.length - 1
    j = 1
    until j > i + 1
      if j == 1
        final += s[i].capitalize
      else
        final += s[i].downcase
     end
    j += 1
    end
    if !(i == s.length - 1)
      final += "-"
    end
  i += 1
  end
  final
end


Check to see if a string has the same amount of 'x's and 'o's. The method must return a boolean and be case insensitive. The string can contain any char.

Examples input/output:

XO("ooxx") => true
XO("xooxx") => false
XO("ooxXm") => true
XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true
XO("zzoo") => false


function XO(str) {
    sum = 0
    for (var x = 0; x < str.length; x++) {
    if (str[x].toLowerCase() == "x") sum++;
    if (str[x].toLowerCase() == "o") sum--;
    }
    return sum == 0;
}



Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 integers. No floats or empty arrays will be passed.

For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.

[10, 343445353, 3453445, 3453545353453] should return 3453455.

Hint: Do not modify the original array.


function sumTwoSmallestNumbers(numbers) {  
  var sum = 0
  array = numbers.sort(function(a,b) {return a - b})
    for (x = 0; x <= 1; x++) {
      sum += array[x]
      } return sum
}; 



We want to know the index of the vowels in a given word, for example, there are two vowels in the word super (the second and fourth letters).

So given a string "super", we should return a list of [2, 4].

Some examples:
Mmmm  => []
Super => [2,4]
Apple => [1,5]
YoMama -> [1,2,4,6]
NOTE: Vowels in this context refers to English Language Vowels - a e i o u y

NOTE: this is indexed from [1..n] (not zero indexed!)



def vowel_indices(word)
	vowels = ["a", "e", "i", "o", "u", "y"]
  word_ct = 0
  final = []
  while word_ct < word.length do
    vwl_ct = 0
    until vwl_ct == vowels.length do
      if word[word_ct].downcase == vowels[vwl_ct]
        final << word_ct + 1
      end
      vwl_ct += 1
    end
  word_ct += 1
  end
  return final
end




Given an array of integers your solution should find the smallest integer.

For example:
Given [34, 15, 88, 2] your solution will return 2
Given [34, -345, -1, 100] your solution will return -345
You can assume, for the purpose of this kata, that the supplied array will not be empty.



class SmallestIntegerFinder {
  findSmallestInt(args) {
    var shortest = 1000000000000
    for (var x = 0; x < args.length; x++) {
      if (args[x] < shortest) {
        shortest = args[x]
      }
    } return shortest
  } 
}



Complete the solution so that it reverses the string value passed into it.

solution('world'); // returns 'dlrow'


function solution(str){
  final = ""
  for(i=str.length-1;i>=0;i--) {
    final += str[i]
  }
  return final
}


As a part of this Kata, you need to create a function that when provided with a triplet, returns the index of the numerical element that lies between the other two elements.

The input to the function will be an array of three distinct numbers (Haskell: a tuple).

For example:

gimme([2, 3, 1]) => 0
2 is the number that fits between 1 and 3 and the index of 2 in the input array is 0.

Another example (just to make sure it is clear):

gimme([5, 10, 14]) => 1
10 is the number that fits between 5 and 14 and the index of 10 in the input array is 1.


var gimme = function (inputArray) {
  if ((inputArray[0] < inputArray[1] && inputArray[0] > inputArray[2])
  || (inputArray[0] > inputArray[1] && inputArray[0] < inputArray[2])) {
  return 0
  }
  if ((inputArray[1] < inputArray[0] && inputArray[1] > inputArray[2])
  || (inputArray[1] > inputArray[0] && inputArray[1] < inputArray[2])) {
  return 1
  }
  if ((inputArray[2] < inputArray[1] && inputArray[2] > inputArray[0])
  || (inputArray[2] > inputArray[1] && inputArray[2] < inputArray[0])) {
  return 2
  }
  
};


In this kata you will create a function that takes a list of non-negative integers and strings and returns a new list with the strings filtered out.

Example
filter_list([1,2,'a','b']) == [1,2]
filter_list([1,'a','b',0,15]) == [1,0,15]
filter_list([1,2,'aasf','1','123',123]) == [1,2,123]


function filter_list(l) {
  var array = []
  for (x=0; x<l.length; x++) {
    if (typeof l[x] === "number") {
    array.push(l[x])
    }
  } return array
}
function filter_list(l) {
  return l.filter(function(v) {return typeof v === "number"})
}
function filter_list(l) {
  return l.filter (function(v) {return typeof v === "number"})
}
function filter_list(l) {
  return l.filter (function (v) {return typeof v === "number"})
}



Implement the method isSortedAndHow, which accepts an array of integers, and returns one of the following:

'yes, ascending' - if the numbers in the array are sorted in an ascending way
'yes, descending' - if the numbers in the array are sorted in a descending way
'no'
You can assume the array will always be valid, and there will always be one correct answer.


def is_sorted_and_how(arr)
    if arr.sort == arr
      return "yes, ascending"
    elsif arr.sort.reverse == arr
      return "yes, descending"
    else
      return "no"
    end
end



Trolls are attacking your comment section!

A common way to deal with this situation is to remove all of the vowels from the trolls' comments, neutralizing the threat.

Your task is to write a function that takes a string and return a new string with all vowels removed.

For example, the string "This website is for losers LOL!" would become "Ths wbst s fr lsrs LL!".

Note: for this kata y isn't considered a vowel.

Beware: In error messages Expected and Actual are flipped.


function disemvowel(str) {
  return str.replace(/[aeiou]/gi, "")
}


Welcome. In this kata, you are asked to square every digit of a number.

For example, if we run 9119 through the function, 811181 will come out, because 92 is 81 and 12 is 1.

Note: The function accepts an integer and returns an integer


def square_digits(num)
  final = ""
  num_string = num.to_s
  i = 0
  until i > num_string.length - 1
    final += (num_string[i].to_i * num_string[i].to_i).to_s
  i += 1
  end
  final.to_i
end



Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word.

Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

Example:

Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
Note that the Java version expects a return value of null for an empty string or null.


class String
  def toJadenCase
     array = self.split(" ")
     final = []
     array.each do |k|
       final << k.capitalize
     end
     final.join(" ")
  end
end


Given two numbers and an arithmetic operator (the name of it, as a string), return the result of the two numbers having that operator used on them.

a and b will both be positive integers, and a will always be the first number in the operation, and b always the second.

The four operators are "add", "subtract", "divide", "multiply".

A few examples:

arithmetic(5, 2, "add")      => returns 7
arithmetic(5, 2, "subtract") => returns 3
arithmetic(5, 2, "multiply") => returns 10
arithmetic(5, 2, "divide")   => returns 2.5
Try to do it without using if statements!




def arithmetic(a, b, operator)
  if operator == "add"
    return a + b
  elsif operator == "subtract"
    return a - b
  elsif operator == "multiply"
    return a * b
  elsif operator == "divide"
    return a / b
  end
end



Your task is to make a function that can take any non-negative integer as a argument and return it with its digits in descending order. Essentially, rearrange the digits to create the highest possible number.

Examples:
Input: 21445 Output: 54421

Input: 145263 Output: 654321

Input: 1254859723 Output: 9875543221


def descending_order(n)
  n.to_s.split("").sort.reverse.join("").to_i
end


Implement a method that accepts 3 integer values a, b, c. The method should return true if a triangle can be built with the sides of given length and false in any other case.

(In this case, all triangles must have surface greater than 0 to be accepted).


function isTriangle(a,b,c) {
  if ((a + b > c) && (a + c > b) && (b + c > a)) {
    return true
  } else {
   return false;
  }
}


Take 2 strings s1 and s2 including only letters from ato z. Return a new sorted string, the longest possible, containing distinct letters,

each taken only once - coming from s1 or s2. #Examples: ``` a = "xyaabbbccccdefww" b = "xxxxyyyyabklmopq" longest(a, b) -> "abcdefklmopqwxy"
a = "abcdefghijklmnopqrstuvwxyz" longest(a, a) -> "abcdefghijklmnopqrstuvwxyz" ```


def longest(a1, a2)
  first_array = a1.split("")
  second_array = a2.split("")
  third_array = first_array.push(second_array).flatten.uniq.sort.join("")
end



The Western Suburbs Croquet Club has two categories of membership, Senior and Open. They would like your help with an application form that will tell prospective members which category they will be placed.

To be a senior, a member must be at least 55 years old and have a handicap greater than 7. In this croquet club, handicaps range from -2 to +26; the better the player the lower the handicap.

Input
Input will consist of a list of lists containing two items each. Each list contains information for a single potential member. Information consists of an integer for the person's age and an integer for the person's handicap.

Note for F#: The input will be of (int list list) which is a List>

Example Input
[[18, 20],[45, 2],[61, 12],[37, 6],[21, 21],[78, 9]]
Output
Output will consist of a list of string values (in Haskell: Open or Senior) stating whether the respective member is to be placed in the senior or open category.

Example Output
["Open", "Open", "Senior", "Open", "Open", "Senior"]


function openOrSenior(data){
  var newArr = []
  for (x = 0; x < data.length; x++) {
      if ((data[x][0] >= 55) && (data[x][1] > 7)) {
        newArr.push("Senior")
      } else
        newArr.push("Open")
  } return newArr
}


Your task is to write function toLeetSpeak that converts a regular english sentence to Leetspeak.

More about LeetSpeak You can read at wiki -> https://en.wikipedia.org/wiki/Leet

Consider only uppercase letters (no lowercase letters, no numbers) and spaces.

For example:

toLeetSpeak("LEET") returns "1337"
In this kata we use a simple LeetSpeak dialect. Use this alphabet:

{
  A : '@',
  B : '8',
  C : '(',
  D : 'D',
  E : '3',
  F : 'F',
  G : '6',
  H : '#',
  I : '!',
  J : 'J',
  K : 'K',
  L : '1',
  M : 'M',
  N : 'N',
  O : '0',
  P : 'P',
  Q : 'Q',
  R : 'R',
  S : '$',
  T : '7',
  U : 'U',
  V : 'V',
  W : 'W',
  X : 'X',
  Y : 'Y',
  Z : '2'
}


function toLeetSpeak(str) {
  var dictionary = {
  A : '@',
  B : '8',
  C : '(',
  D : 'D',
  E : '3',
  F : 'F',
  G : '6',
  H : '#',
  I : '!',
  J : 'J',
  K : 'K',
  L : '1',
  M : 'M',
  N : 'N',
  O : '0',
  P : 'P',
  Q : 'Q',
  R : 'R',
  S : '$',
  T : '7',
  U : 'U',
  V : 'V',
  W : 'W',
  X : 'X',
  Y : 'Y',
  Z : '2'
}
  var final = ""
  for (var i=0; i<str.length; i++) {
    if (str[i] === " ") {
      final += " "
    } else {
    final += dictionary[str[i]]
    }
  }
  return final
}


Your task is to write function findSum.

Upto and including n, this function will return the sum of all multiples of 3 and 5.

For example:

findSum(5) should return 8 (3 + 5)

findSum(10) should return 33 (3 + 5 + 6 + 9 + 10)


def find(n)
  total = 0
  i = 0
  until i > n
    if (i % 3 == 0) || (i % 5 == 0)
      total += i
    end
  i += 1
  end
  total
end


An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.

isIsogram( "Dermatoglyphics" ) == true
isIsogram( "aba" ) == false
isIsogram( "moOse" ) == false // -- ignore letter case


def is_isogram(string)
  array = string.downcase.split("")
  i = 0
  until i > array.length - 1
    truth_counter = 0
    j = 0
    until j > array.length - 1
      if array[i] == array[j]
        truth_counter += 1
        p truth_counter
      end
    j += 1
    end
    if truth_counter > 1
      return false
    end
  i += 1
  end
  return true
end



Task:
Your task is to write a function which returns the sum of following series upto nth term(parameter).

Series: 1 + 1/4 + 1/7 + 1/10 + 1/13 + 1/16 +...
Rules:
You need to round the answer to 2 decimal places and return it as String.

If the given value is 0 then it should return 0.00

You will only be given Natural Numbers as arguments.

Examples:
SeriesSum(1) => 1 = "1.00"
SeriesSum(2) => 1 + 1/4 = "1.25"
SeriesSum(5) => 1 + 1/4 + 1/7 + 1/10 + 1/13 = "1.57"
NOTE: In PHP the function is called series_sum().


function SeriesSum(n)
{
 var sum = 0
 for(x = 0; x < n; x++) {
   sum += 1 / (3 * x + 1)
   } return sum.toFixed(2)
}


Write a function that takes an array of strings as an argument and returns a sorted array containing the same strings, ordered from shortest to longest.

For example, if this array were passed as an argument:

["Telescopes", "Glasses", "Eyes", "Monocles"]

Your function would return the following array:

["Eyes", "Glasses", "Monocles", "Telescopes"]

All of the strings in the array passed to your function will be different lengths, so you will not have to decide how to order multiple strings of the same length.


function sortByLength (array) {
  return array.sort((a, b) => a.length - b.length)
};


Write a function named sumDigits which takes a number as input and returns the sum of the absolute value of each of the number's decimal digits. For example:

  sumDigits(10);  // Returns 1
  sumDigits(99);  // Returns 18
  sumDigits(-32); // Returns 5
Let's assume that all numbers in the input will be integer values.


def sumDigits(number)
  if number < 0
    positive = (number * -1).to_s
  else
    positive = (number).to_s
  end
  total = 0
  i = 0
  until i > positive.length
    total += positive[i].to_i
    i += 1
  end
  return total
end


We need to write some code to return the original price of a product, the return type must be of type decimal and the number must be rounded to two decimal places.

We will be given the sale price (discounted price), and the sale percentage, our job is to figure out the original price.

For example:
Given an item at $75 sale price after applying a 25% discount, the function should return the original price of that item before applying the sale percentage, which is ($100.00) of course, rounded to two decimal places.

DiscoverOriginalPrice(75, 25) => 100.00M where 75 is the sale price (discounted price), 25 is the sale percentage and 100 is the original price


function discoverOriginalPrice(discountedPrice, salePercentage){
  return +(discountedPrice / (1 - salePercentage / 100)).toFixed(2);
  
  }


Write a program to find count of the most frequent item of an array.

Assume that input is array of integers.

Ex.:

input array: [3, -1, -1, -1, 2, 3, -1, 3, -1, 2, 4, 9, 3]
ouptut: 5
Most frequent number in example array is -1. It occurs 5 times in input array.


function mostFrequentItemCount(collection) {
  var count = {}
  for (i=0; i<collection.length; i++) {
    if (count[collection[i]]) {
      count[collection[i]] += 1
    } else {
      count[collection[i]] = 1
    }
  }
  var output = 0
  Object.keys(count).forEach(function(keys) {
    if (count[keys] > output) {
      output = count[keys]
    }
  })
  return output
}


Every week (Friday and Saturday night), the farmer and his son count amount of sheep returned to the yard of their farm.

They count sheep on Friday night, the same goes for Saturday (suppose that sheep returned on Friday are not feeding back on hills on Saturday).

As sheep are not coming in one flock, you will be given two arrays (one for each night) representing number of sheep as they were returning to the yard during the evenings (entries are positive ints, higher than zero).

Farmer and his son know the total amount of their sheep, you will be given this number as third parameter.

Your goal is to calculate the amount of sheep lost (not returned) to the farm after Saturday night counting.

Example 1: Input: {1, 2}, {3, 4}, 15 --> Output: 5

Example 2: Input: {3, 1, 2}, {4, 5}, 21 --> Output: 6

Good luck! :-)


def lost_sheep(friday,saturday,total)
  big_array = friday + saturday
  sum = 0
  i = 0
  until i > big_array.length - 1
    sum += big_array[i]
  i += 1
  end
  return total - sum
end


You have an array of numbers 1 through n (where 1 <= n <= 10). The array needs to be formatted correctly for the person reading the countdown of a spaceship launch.

Unfortunately, the person reading the countdown only knows how to read strings. After the array is sorted correctly make sure it's in a format he can understand.

Between each number should be a space and after the final number (n) should be the word 'liftoff!'

Example:

// Given
instructions = [8,1,10,2,7,9,6,3,4,5]
// Should return
"10 9 8 7 6 5 4 3 2 1 liftoff!"
// Given
instructions = [1,2,4,3,5]
// Should return
"5 4 3 2 1 liftoff!"

function liftoff(instructions){
  var final = ""
  var sort_reverse = instructions.sort((a, b) => a - b).reverse()
  for (i=0; i<sort_reverse.length; i++) {
    final += sort_reverse[i]
    final += " "
  }
  final += "liftoff!"
  return final
}


When given a string of space separated words, return the word with the longest length. If there are multiple words with the longest length, return the last instance of the word with the longest length.

Example:

'red white blue' //returns string value of white

'red blue gold' //returns gold



def longest_word(string_of_words)
  array_of_words = string_of_words.split(" ")
  final = ""
  i = 0
  until i > array_of_words.length - 1
    if array_of_words[i].length >= final.length
      final = array_of_words[i]
    end
  i += 1
  end
  final
end


Help Suzuki rake his garden!

The monastery has a magnificent Zen garden made of white gravel and rocks and it is raked diligently everyday by the monks. Suzuki having a keen eye is always on the lookout for anything creeping into the garden that must be removed during the daily raking such as insects or moss.

You will be given a string representing the garden such as:

garden = 'gravel gravel gravel gravel gravel gravel gravel gravel gravel rock slug ant gravel gravel snail rock gravel gravel gravel gravel gravel gravel gravel slug gravel ant gravel gravel gravel gravel rock slug gravel gravel gravel gravel gravel snail gravel gravel rock gravel snail slug gravel gravel spider gravel gravel gravel gravel gravel gravel gravel gravel moss gravel gravel gravel snail gravel gravel gravel ant gravel gravel moss gravel gravel gravel gravel snail gravel gravel gravel gravel slug gravel rock gravel gravel rock gravel gravel gravel gravel snail gravel gravel rock gravel gravel gravel gravel gravel spider gravel rock gravel gravel'
Rake out any items that are not a rock or gravel and replace them with gravel such that:

garden = 'slug spider rock gravel gravel gravel gravel gravel gravel gravel'
Returns a string with all items except a rock or gravel replaced with gravel:

garden = 'gravel gravel rock gravel gravel gravel gravel gravel gravel gravel'

def rake_garden(garden)
  arrayed = garden.split(" ")
  final = ""
  i = 0
  until i > arrayed.length - 1
    if arrayed[i] != "gravel" && arrayed[i] != "rock"
      final += "gravel "
    else
      final += arrayed[i] + " "
    end
  i += 1
  end
  final[0..-2]
end


Given a string and an array of integers representing indices, capitalize all letters at the given indices.

For example:

capitalize("abcdef",[1,2,5]) = "aBCdeF"
capitalize("abcdef",[1,2,5,100]) = "aBCdeF". There is no index 100.
The input will be a lowercase string with no spaces and an array of digits.

Good luck!


function capitalize(s,arr){
  array = arr.sort(function(a,b) { return a - b; })
  console.log(array)
  final = ""
  nums = 0
  for (i=0;i<s.length;i++) {
    if (i === array[nums]) {
      final += s[i].toUpperCase()
      nums += 1
    } else {
      final += s[i]
    }
  }
  return final;
};


Complete the function/method so that it returns the url with anything after the anchor (#) removed.

Examples:

// returns 'www.codewars.com'
removeUrlAnchor('www.codewars.com#about')

// returns 'www.codewars.com?page=1' 
removeUrlAnchor('www.codewars.com?page=1')


def remove_url_anchor(url)
  i = 0
  final = ""
  until i == url.length
    if url[i] == "#"
      return final
    else
      final += url[i]
    end
    i += 1
  end
  final
end


Remove HTML tags and return string without:
1) <tag> and </tag>
2) <tag/>
3) <tag />
4) html tags with attributes.
Don't trim space, tab etc.

You have to use regexp.

Tests are using function:
String.prototype.replace(your regexp, "")

Have fun :)


var reg = /<.+?>/g


Training JS #40:
Regular Expression--"|", "[]" and "()""

In this lesson, we learn about "|", "[]" and "()".

"|" means or. It is used between two or more character expressions, representing a selective match. /a|b/ can match character a or b, /a|b|c/ can match one of a b and c. Let's see some examples:

var str="abc";
console.log( str.match(/a|b/g) );    //output: [ 'a', 'b' ]
console.log( str.match(/a|b|c/g) );  //output: [ 'a', 'b', 'c' ]
console.log( str.match(/ab|c/g) );   //output: [ 'ab', 'c' ]
console.log( str.match(/a|bc/g) );   //output: [ 'a', 'bc' ]
We can see that it can be used not only for a single character. In fact, every part of it is a sub expression. Like this:

var str="good wood food cat bat hat";
console.log( str.match(/good|wood|food/g) ); //output: [ 'good', 'wood', 'food' ]
console.log( str.match(/cat|bat|hat/g) );    //output: [ 'cat', 'bat', 'hat' ]
Using () can turn a regular expression into a sub expression, as part of a complex regular expression. In the example above, the matching words have similar characteristics. "good", "wood", "food" all end up with "ood", "cat", "bat", "hat" all end up with "at". We can write regular expression like this:

var str="good wood food cat bat hat";
console.log( str.match(/(g|w|f)ood/g) ); //output: [ 'good', 'wood', 'food' ]
console.log( str.match(/(c|b|h)at/g) );  //output: [ 'cat', 'bat', 'hat' ]
() and | can be nested. Like this:

var str="good wood food cat bat hat";
console.log( str.match(/((g|w|f)ood)|((c|b|h)at)/g) );
//output: [ 'good', 'wood', 'food', 'cat', 'bat', 'hat' ]
() sub expressions can be used in combination with "?" "*" "+". See example:

var str="ababcdcd";
console.log( str.match(/(ab)*/g) );    //output: [ 'abab', '', '', '', '', '' ]
console.log( str.match(/(ab)+/g) );    //output: [ 'abab' ]
console.log( str.match(/(ab)?(cd)*/g) );  //output: [ 'ab', 'abcdcd', '' ]
console.log( str.match(/(ab)?(cd)+/g) );  //output: [ 'abcdcd' ]
The following example is used to determine if a word begins with "aeiou":

function aAn(word){
  return (/^(a|e|i|o|u)/i.test(word) ? "An " : "A ") + word;
}
console.log( aAn("apple"))  //output: An apple
console.log( aAn("Apple"))  //output: An Apple
console.log( aAn("egg"))    //output: An egg
console.log( aAn("car"))    //output: A car
If we want the regular expression in the above example to be more concise, maybe we need to learn []. [] can list some characters to form a character set. The example above can be written in this way:

function aAn(word){
  return (/^[aeiou]/i.test(word) ? "An " : "A ") + word;
}
console.log( aAn("apple"))  //output: An apple
console.log( aAn("Apple"))  //output: An Apple
console.log( aAn("egg"))    //output: An egg
console.log( aAn("car"))    //output: A car
If we want to match all the numbers, [0123456789] looks a little bit longer. We can use "-" in the [] indicates the range. [0-9] match numbers 0 to 9, [a-z] matches all lowercase letters, etc.. Let's see a classic example, used to verify the user name:

//A correct user name should be: 
//1.it can use letters, digits, and underscores
//2.with a total length of 6-16 characters
//3.beginning with the letter.
function verify(username){
  return /^[a-z][a-z0-9_]{5,15}$/i.test(username);
}
console.log( verify("myjinxin2015"))  //output: true
console.log( verify("smile67"))       //output: true
console.log( verify("GiacomoSorbi"))  //output: true
console.log( verify("jhoffner"))      //output: true
console.log( verify("g964") )         //output: false     username too short
console.log( verify("matt c") )       //output: false     username contains space
console.log( verify("My_name_is_ZozoFouchtra") )  //output: false   username too long
In the example above, ^[a-z] matches a letter, [a-z0-9_]{5-15}$ matches 5-15 letters, digits, and underscores.

If "^" appears in the first position of the [], it means that to match character which outside the character set. [^a] matches all characters but a, [^0-9] matches all characters but numbers, etc.. Let's see an example:

var str="a1!b2@c3#d4$e5%";
console.log( str.replace(/[^a-z]/g,""))  //output: abcde
console.log( str.replace(/[^0-9]/g,""))  //output: 12345
console.log( str.replace(/[^!@#$%]/g,""))  //output: !@#$%
Ok, lesson is over. let's us do some task.

#Task
This time you need to write a regular expression that matches all URL contained in the string. 

The rules:

1) URL start with ```http:// or https://```

2) URL end with ```.com``` or ```.net```

3) The middle part of URL can use letters, numbers and dots

4) Need to ignore case, and a string may contain multiple URLs

5) Your regular expression name should be ```regex``` and your result should be a string array.

Some examples:
```
"http://codewars.com".match(regex)
should return [ 'http://codewars.com' ]    
"http://www.codewars.com".match(regex)
should return [ 'http://www.codewars.com' ]
"HTTP://CODEWARS.COM".match(regex)
should return [ 'HTTP://CODEWARS.COM' ]
"https://www.codewars.com".match(regex)
should return [ 'https://www.codewars.com' ]
"http://www.codewars.net".match(regex)
should return [ 'http://www.codewars.net' ]
"1234http://www.codewars.comabcd".match(regex)
should return [ 'http://www.codewars.com' ]
"http://www.codewars1.com!@#$%http://www.codewars2.net".match(regex)
should return [ 'http://www.codewars1.com', 'http://www.codewars2.net' ]
"http://www.codewars.com.net".match(regex)
should return [ 'http://www.codewars.com.net' ]
"http://www.codewars.com.fak".match(regex)
should return [ 'http://www.codewars.com' ]

These examples should return null:
"ftp://www.codewars.com".match(regex)
"http://www.code#wars.com".match(regex)
"http://wwwcodewarscom".match(regex)
"http://www.codewars.org".match(regex)
"http://www . codewars . com".match(regex)
"http://mail@codewars.com".match(regex)
```

Hint: to match ```"/"``` and ```"."```, you should use ```"\/"``` and ```"\."``` 
```"\"``` is the escape character, we will learn it in the next lesson.
##Series:

( ↑↑↑ Click the link above can get my newest kata list, Please add it to your favorites)

#1: create your first JS function helloWorld
#2: Basic data types--Number
#3: Basic data types--String
#4: Basic data types--Array
#5: Basic data types--Object
#6: Basic data types--Boolean and conditional statements if..else
#7: if..else and ternary operator
#8: Conditional statement--switch
#9: loop statement --while and do..while
#10: loop statement --for
#11: loop statement --break,continue
#12: loop statement --for..in and for..of
#13: Number object and its properties
#14: Methods of Number object--toString() and toLocaleString()
#15: Methods of Number object--toFixed(), toExponential() and toPrecision()
#16: Methods of String object--slice(), substring() and substr()
#17: Methods of String object--indexOf(), lastIndexOf() and search()
#18: Methods of String object--concat() split() and its good friend join()
#19: Methods of String object--toUpperCase() toLowerCase() and replace()
#20: Methods of String object--charAt() charCodeAt() and fromCharCode()
#21: Methods of String object--trim() and the string template
#22: Unlock new skills--Arrow function,spread operator and deconstruction
#23: methods of arrayObject---push(), pop(), shift() and unshift()
#24: methods of arrayObject---splice() and slice()
#25: methods of arrayObject---reverse() and sort()
#26: methods of arrayObject---map()
#27: methods of arrayObject---filter()
#28: methods of arrayObject---every() and some()
#29: methods of arrayObject---concat() and join()
#30: methods of arrayObject---reduce() and reduceRight()
#31: methods of arrayObject---isArray() indexOf() and toString()
#32: methods of Math---round() ceil() and floor()
#33: methods of Math---max() min() and abs()
#34: methods of Math---pow() sqrt() and cbrt()
#35: methods of Math---log() and its family
#36: methods of Math---kata author's lover:random()
#37: Unlock new weapon---RegExp Object
#38: Regular Expression--"^","$", "." and test()
#39: Regular Expression--"?", "*", "+" and "{}"
#40: Regular Expression--"|", "[]" and "()"
#41: Regular Expression--"\"
#42: Regular Expression--(?:), (?=) and (?!)
FUNDAMENTALS

Poweredby_qualified
Solution:

var regex=/*coding here..*/
Sample Tests:

    Test.assertSimilar("http://codewars.com".match(regex), [ 'http://codewars.com' ]);
    Test.assertSimilar("http://www.codewars.com".match(regex), [ 'http://www.codewars.com' ]);
    Test.assertSimilar("HTTP://CODEWARS.COM".match(regex), [ 'HTTP://CODEWARS.COM' ]);
    Test.assertSimilar("https://www.codewars.com".match(regex), [ 'https://www.codewars.com' ]);
    Test.assertSimilar("http://www.codewars.net".match(regex), [ 'http://www.codewars.net' ]);
    Test.assertSimilar("1234http://www.codewars.comabcd".match(regex), [ 'http://www.codewars.com' ]);
    Test.assertSimilar("http://www.codewars1.com!@#$%http://www.codewars2.net".match(regex), [ 'http://www.codewars1.com', 'http://www.codewars2.net' ]);
    Test.assertSimilar("http://www.codewars1.comabchttp://www.codewars2.net".match(regex), [ 'http://www.codewars1.com', 'http://www.codewars2.net' ]);
    Test.assertSimilar("http://www.codewars.com.net".match(regex), [ 'http://www.codewars.com.net' ]);
    Test.assertSimilar("http://www.codewars.com.fak".match(regex), [ 'http://www.codewars.com' ]);
    
    Test.assertSimilar("ftp://www.codewars.com".match(regex),null);
    Test.assertSimilar("http://www.code#wars.com".match(regex),null);
    Test.assertSimilar("http://www.codewars.org".match(regex),null);
    Test.assertSimilar("http://www . codewars . com".match(regex),null);
    Test.assertSimilar("http://mail@codewars.com".match(regex),null);
    Test.assertSimilar("http://.com".match(regex), null);
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT




Description:
At 'We Rate Dogs', we try our best to give dogs accurate ratings, which will always be above 10/10. Because they're good dogs. Over the weekend Bront has come in and hacked our system, lowering the ratings of dogs to below 10/10. Please help to fix Brant's bad system and give the dogs their original ratings. They're good dogs Brent.

Task:
The function weRateDogs(str, rating) takes a string and an integer as the inputs. Within the string is an incorrect rating x/y.

You will need to change the incorrect rating x/y to the correct rating rating/10. The given string may contain numbers and letters, but no special characters other than /.

For example:
if you are given the following string:
'This is Max99. She has one ear that is always s1ightly higher than the other 4/10 wonky af'
And the following rating: 11 return: 'This is Max99. She has one ear that is always s1ightly heigher than the other 11/10 wonky af'


function weRateDogs(str, rating){
  var ratingRegex = /[0-9]+\/[0-9]+/
  return str.replace(ratingRegex, rating + "/10")
}


To pass the series of gates guarded by the owls, Kenneth needs to present them each with a highly realistic portrait of one. Unfortunately, he is absolutely rubbish at drawing, and needs some code to return a brand new portrait with a moment's notice.

All owl heads look like this:

''0v0''
Such beautiful eyes! However, they differ in their plumage, which is always symmetrical, eg.:

   VVHVAV''0v0''VAVHVV
or

YYAYAH8XH''0v0''HX8HAYAYY
So Kenneth needs a method that will take a garble of text generated by mashing at his keyboard (numbers and letters, but he knows how to avoid punctuation etc.) for a bit and give him a symmetrical owl with a lovely little face, with a truly symmetrical plumage made of uppercase letters and numbers.

(To be clear, the acceptable characters for the plumage are 8,W,T,Y,U,I,O,A,H,X,V and M.)


function owlPic(text){
  var left = text.match(/[8WTYUIOAHXVM]/gi)
  return left.join("").toUpperCase() + "''0v0''" + left.reverse().join("").toUpperCase()
}


Description:
You are playing a simple slot machine that only contains exclamation marks and question marks. Every time the slot machine is started, a string of 5 length is obtained. If you're lucky enough to get a Special permutation, you'll win the bonus. Give you a string s, return the highest bonus.

Bouns list:

 Five-of-a-Kind:   ---- 1000
 "!!!!!" or "?????"

 Four-of-a-Kind:    ---- 800
 The string contains a "!!!!" or "????"
 "!!!!?","?!!!!","????!","!????"

 Full House:         ----500
 such as "!!!??" or "???!!"...

 Three-of-a-Kind:    ---- 300
 The string contains a "!!!" or "???"
 such as "!!!?!","!???!"...

 Two pair:           ---- 200
 The string contains two "!!" or "??"
 such as "??!!?","!!?!!"

 A Pair:             ---- 100
 The string contains a "!!" or "??"
 such as "?!??!","!!?!?"

 Others              ---- 0
 such as "?!?!?","!?!?!"
Examples
slot("!!!!!") === 1000
slot("!!!!?") === 800
slot("!!!??") === 500
slot("!!!?!") === 300
slot("!!?!!") === 200
slot("!!?!?") === 100
slot("!?!?!") === 0


function slot(s){
  var fiveKind = /^(!!!!!|\?\?\?\?\?)$/
  if (fiveKind.test(s)) {
    return 1000
  }
  var fourKind = /^.?(!!!!|\?\?\?\?).?$/
  if (fourKind.test(s)) {
    return 800
  }
  var fullHouse = /^(\?\?\?!!|!!!\?\?|!!\?\?\?|\?\?!!!)$/
  if (fullHouse.test(s)) {
    return 500
  }
  var threeKind = /^.?.?(!!!|\?\?\?).?.?$/
  if (threeKind.test(s)) {
    return 300
  }
  var twoPair = /.?(!!|\?\?).?(!!|\?\?).?/g
  if (twoPair.test(s)) {
    return 200
  }
  var aPair = /(!!|\?\?)/
  if (aPair.test(s)) {
    return 100
  }
  return 0
}
Solution:

function slot(s){
  //coding and coding....
  
  
}
Sample Tests:

describe("Basic Tests", function(){
  it("It should works for basic tests", function(){
​
Test.assertSimilar(slot("!!!!!") , 1000)
Test.assertSimilar(slot("!!!!?") , 800)
Test.assertSimilar(slot("!!!??") , 500)
Test.assertSimilar(slot("!!!?!") , 300)
Test.assertSimilar(slot("!!?!!") , 200)
Test.assertSimilar(slot("!!?!?") , 100)
Test.assertSimilar(slot("!?!?!") , 0)
​
})})
SKIPVIEW SOLUTIONSRESETRUN SAMPLE TESTSATTEMPT



Very simple, given a number, find its opposite.

Examples:

1: -1
14: -14
-34: 34
But can you do it in 1 line of code and without any conditionals?


function opposite(number) {
  return (number * -1)
}


The code does not execute properly. Try to figure out why.

function multiply(a, b){
  return a * b
}


Create a function with two arguments that will return a list of length (n) with multiples of (x).

Assume both the given number and the number of times to count will be positive numbers greater than 0.

Return the results as an array (or list in Python, Haskell or Elixir).

Examples:

countBy(1,10) === [1,2,3,4,5,6,7,8,9,10]
countBy(2,5) === [2,4,6,8,10]


def count_by(x, n)
  tracker = []
  count = 1
  until count == n + 1
    tracker << (x * count)
    count += 1
  end
  tracker
end

In this simple assignment you are given a number and have to make it negative. But maybe the number is already negative?

Example:

makeNegative(1); // return -1
makeNegative(-5); // return -5
makeNegative(0); // return 0
Notes:

The number can be negative already, in which case no change is required.
Zero (0) can't be negative, see examples above.

def makeNegative(num)
  if num > 0
    (num * -1)
  else
    num
  end
end

Can you find the needle in the haystack?

Write a function findNeedle() that takes an array full of junk but containing one "needle"

After your function finds the needle it should return a message (as a string) that says:

"found the needle at position " plus the index it found the needle

So

find_needle(['hay', 'junk', 'hay', 'hay', 'moreJunk', 'needle', 'randomJunk'])
find_needle(['hay', 'junk', 'hay', 'hay', 'moreJunk', 'needle', 'randomJunk'])
findNeedle(['hay', 'junk', 'hay', 'hay', 'moreJunk', 'needle', 'randomJunk'])
findNeedle(new Object[] {"hay", "junk", "hay", "hay", "moreJunk", "needle", "randomJunk"})
find_needle(["hay", "junk", "hay", "hay", "moreJunk", "needle", "randomJunk"])
should return

'found the needle at position 5'
'found the needle at position 5'
'found the needle at position 5'
"found the needle at position 5"
"found the needle at position 5"


function findNeedle(haystack) {
  var found = "found the needle at position " + haystack.indexOf("needle")
  return found
}


Write function RemoveExclamationMarks which removes all exclamation marks from a given string.


function removeExclamationMarks(s) {
  var string = s.replace(/!/g, "");
  
  return string;
}


We need a function that can transform a number into a string.

What ways of achieving this do you know?

Examples:
numberToString(123); // returns '123';`   
numberToString(999); // returns '999';`


function numberToString(num) {
  var string = ""
  return string += num
} 


Write a function called repeatStr which repeats the given string string exactly n times.

repeatStr(6, "I") // "IIIIII"
repeatStr(5, "Hello") // "HelloHelloHelloHelloHello"


function repeatStr (n, s) {
  return s.repeat(n)
}


Very simple, given a number, find its opposite.

Examples:

1: -1
14: -14
-34: 34
But can you do it in 1 line of code and without any conditionals?

function opposite(number) {
  return (number * -1)
}

Write function avg which calculates average of numbers in given list.

function find_average(array) {
  var sum = 0
  for(x = 0; x < array.length; x++) {
    sum += array[x]
  } avg = sum / array.length
  return avg;
}


You get an array of numbers, return the sum of all of the positives ones.

Example [1,-4,7,12] => 1 + 7 + 12 = 20

Note: array may be empty, in this case return 0.


function positiveSum(arr) {
  var sum = 0
  for(x = 0; x < arr.length; x++) {
    if (arr[x] > 0) {
      sum += arr[x]
        }
    } return sum
}


You received a whatsup message from an unknown number. Could it be from that girl/boy with a foreign accent you met yesterday evening?

Write a simple regex to check if the string contains the word hallo in different languages.

These are the languages of the possible people you met the night before:

hello - english
ciao - italian
salut - french
hallo - german
hola - spanish
ahoj - czech republic
czesc - polish
By the way, how cool is the czech republic hallo!!

PS. you can assume the input is a string. PPS. to keep this a beginner exercise you don't need to check if the greeting is a subset of word ('Hallowen' can pass the test)

PS. regex should be case insensitive to pass the tests


function validateHello(greetings) {
  res = /(hello|ciao|salut|hallo|hola|ahoj|czesc)/i.test(greetings)
  return res
}


Given an array of integers.

Return an array, where the first element is the count of positives numbers and the second element is sum of negative numbers.

If the input array is empty or null, return an empty array:

C#/Java: new int[] {} / new int[0];
C++: std::vector<int>();
JavaScript/CoffeeScript/PHP/Haskell: [];
Rust: Vec::<i32>::new();
ATTENTION!
The passed array should NOT be changed. Read more here.

For example:

input [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
return [10, -65].



function countPositivesSumNegatives(input) {
    if (input == null || input.length == 0)
      return [];
    
    var positive = 0;
    var negative = 0;
    
    for (var i=0, l=input.length; i<l; ++i)
    {
      if (input[i] > 0)
        ++ positive;
      else
        negative += input[i];
    }
    
    return [positive, negative];
}


Given a set of numbers, return the additive inverse of each. Each positive becomes negatives, and the negatives become positives.

invert([1,2,3,4,5]) == [-1,-2,-3,-4,-5]
invert([1,-2,3,-4,5]) == [-1,2,-3,4,-5]
invert([]) == []
You can assume that all values are integers.


function invert(array) {
   var newArr = []
   for(x = 0; x < array.length; x++) {
     if (array[x] == 0) {
       newArr.push(0)
       } else {
     newArr.push(array[x] * -1)
     }
   }
   return newArr;
}


Basic regex tasks. Write a function that takes in a numeric code of any lenght. The function will check if the code begins with 1, 2, or 3 and return true if so. Return false otherwise.

You can assume the input will always be a nuber.


function validateCode (code) {
  return /^[123].*/.test(code)
}


Description:
Remove all exclamation marks from sentence but ensure a exclamation mark at the end of string. For a beginner kata, you can assume that the input data is always a non empty string, no need to verify it.

Examples
remove("Hi!") === "Hi!"
remove("Hi!!!") === "Hi!"
remove("!Hi") === "Hi!"
remove("!Hi!") === "Hi!"
remove("Hi! Hi!") === "Hi Hi!"
remove("Hi") === "Hi!"


function remove(s){
  var exRegex = /!/g
  var answer = s.replace(exRegex, "")
  return answer + "!"
  
}


Complete the bool_to_word (PHP: boolToWord ) method.

Given: a boolean value

Return: a 'Yes' string for true and a 'No' string for false




function boolToWord( bool ){
  if ( bool ) {
  return "Yes"
  } 
  
  return "No"
  
} 



The code provided is supposed replace all the dots . in the specified String str with dashes -

But it's not working properly.

Task
Fix the bug so we can all go home early.

Notes
String str will never be null.


var replaceDots = function(str) {
  return str.replace(/\./g, '-');
}


Your task is to create a function - basic_op().

The function should take three arguments - operation(string/char), value1(number), value2(number). The function should return result of numbers after applying the chosen operation.

Examples:

basicOp('+', 4, 7)         // Output: 11
basicOp('-', 15, 18)       // Output: -3
basicOp('*', 5, 5)         // Output: 25
basicOp('/', 49, 7)        // Output: 7


def basic_op(operator, value1, value2)
  if operator == "+"
    value1 + value2
  elsif operator == "-"
    value1 - value2
  elsif operator == "*"
    value1 * value2
  elsif operator == "/"
    value1 / value2
  end
end


Description:
Remove a exclamation mark from the end of string. For a beginner kata, you can assume that the input data is always a string, no need to verify it.

Examples
remove("Hi!") === "Hi"
remove("Hi!!!") === "Hi!!"
remove("!Hi") === "!Hi"
remove("!Hi!") === "!Hi"
remove("Hi! Hi!") === "Hi! Hi"
remove("Hi") === "Hi"
Note
Please don't post issue about difficulty or duplicate.


function remove(s){
  var final = s.replace(/!$/, "")
  return final
}


Summation
Write a program that finds the summation of every number between 1 and num. The number will always be a positive integer greater than 0.

For example:

summation(2) -> 3
1 + 2

summation(8) -> 36
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8


var summation = function (num) {
  var sum = 0
    for(x = 1; x <= num; x++) {
    sum += x
    } return sum
} 



Write a function powersOfTwo which will return list of all powers of 2 from 0 to n (where n is an exponent).

E.g:

n = 0 -> 2^0 -> [1]

n = 1 -> 2^0, 2^1 -> [1,2]

n = 2 -> 2^0, 2^1, 2^2 -> [1,2,4]




def powers_of_two(n)
  total = []
  count = 0
  until count == n + 1
    total << (2**count)
    count += 1
  end
  total
end
def powers_of_two(n)
  (0..n).map do |it|
    2**it
  end
end




The cockroach is one of the fastest insects. Write a function which takes its speed in km per hour and returns it in cm per second, rounded down to the integer (= floored).

For example:

cockroachSpeed(1.08) == 30
Note! The input is a Real number (actual type is language dependent) and is >= 0. The result should be an Integer.



def cockroach_speed(s)
  (((s * 100000) / 60) / 60).floor
end



Your task is to make two functions, max and min (maximum and minimum in PHP) that take a(n) array/vector of integers list as input and outputs, respectively, the largest and lowest number in that array/vector.

#Examples

max([4,6,2,1,9,63,-134,566]) returns 566
min([-52, 56, 30, 29, -54, 0, -110]) returns -110
max([5]) returns 5
min([42, 54, 65, 87, 0]) returns 0
#Notes

You may consider that there will not be any empty arrays/vectors.



def min(list)
  sorted_list = list.sort
  return sorted_list[0]
end

def max(list)
  reverse_sorted_list = list.sort.reverse
  return reverse_sorted_list[0]
end


Description:
Remove n exclamation marks in the sentence from left to right. n is positive integer.

Examples
remove("Hi!",1) === "Hi"
remove("Hi!",100) === "Hi"
remove("Hi!!!",1) === "Hi!!"
remove("Hi!!!",100) === "Hi"
remove("!Hi",1) === "Hi"
remove("!Hi!",1) === "Hi!"
remove("!Hi!",100) === "Hi"
remove("!!!Hi !!hi!!! !hi",1) === "!!Hi !!hi!!! !hi"
remove("!!!Hi !!hi!!! !hi",3) === "Hi !!hi!!! !hi"
remove("!!!Hi !!hi!!! !hi",5) === "Hi hi!!! !hi"
remove("!!!Hi !!hi!!! !hi",100) === "Hi hi hi"
Note
Please don't post issue about difficulty or duplicate.




function remove(s,n){
  var exRegex = /!/
  var answer = s
  for (var i = 0; i < n; i++) {
    answer = answer.replace(exRegex, "")
  }
  return answer
}



Your task is simply to count the total number of lowercase letters in a string.

Examples
lowercaseCount("abc"); ===> 3

lowercaseCount("abcABC123"); ===> 3

lowercaseCount("abcABC123!@€£#$%^&*()_-+=}{[]|\':;?/>.<,~"); ===> 3

lowercaseCount(""); ===> 0;

lowercaseCount("ABC123!@€£#$%^&*()_-+=}{[]|\':;?/>.<,~"); ===> 0

lowercaseCount("abcdefghijklmnopqrstuvwxyz"); ===> 26



function lowercaseCount(str){
  var lowerRegexp = /[a-z]/g
  if (str.match(lowerRegexp)) {
    return (str.match(lowerRegexp)).length
  } else {
    return 0
  }
}


Numbers ending with zeros are boring.

They might be fun in your world, but not here.

Get rid of them. Only the ending ones.

1450 -> 145
960000 -> 96
1050 -> 105
-1050 -> -105
Zero alone is fine, don't worry about it. Poor guy anyway



function noBoringZeros(n) {
  if (n === 0) {
    return 0
  } else {
    var string = String(n)
    string = string.replace(/0*$/g, "")
    return Number(string)
  }
}



Write a simple regex to validate a username.

Allowed characters are:

-lowercase letters -numbers -underscore

length shoould be between 4 and 16 characters.


function validateUsr(username) {
  res =  /^[a-z0-9_]{4,16}$/.test(username) 
  return res
}


Implement String#digit? (in Java StringUtils.isDigit(String)), which should return true if given object is a digit (0-9), false otherwise.



String.prototype.digit = function() {
  var numRegexp = /^[0-9]$/
  return numRegexp.test(this)
};


You probably know the 42 number as "The answer to life, the universe and everything" according to Douglas Adams' "The Hitchhiker's Guide to the Galaxy". For Freud, the answer was quite different.

In the society he lived in, people-women in particular- had to repress their sexual needs and desires. This was simply how the society was at the time. Freud then wanted to study the illnesses created by this, and so he digged to the root of their desires. This led to some of the most important psychoanalytic theories to this day, Freud being the father of psychoanalysis.

Now, basically, when a person hears about Freud, s/he hears "sex" because for Freud, everything was basically related to, and explained by sex.

In this kata, the toFreud() function will take a string as its argument, and return a string with every word replaced by the explanation to everything, according to Freud. Note that an empty string, or no arguments, should result in the ouput being ""(empty string).


function toFreud(string) {
  return string.replace(/[a-zA-Z']+/g, "sex")
}


Deoxyribonucleic acid, DNA is the primary information storage molecule in biological systems. It is composed of four nucleic acid bases Guanine ('G'), Cytosine ('C'), Adenine ('A'), and Thymine ('T').

Ribonucleic acid, RNA, is the primary messenger molecule in cells. RNA differs slightly from DNA its chemical structure and contains no Thymine. In RNA Thymine is replaced by another nucleic acid Uracil ('U').

Create a funciton which translates a given DNA string into RNA.

For example:

DNAtoRNA("GCAT") returns ("GCAU")



def DNAtoRNA(dna)
  final = ""
  i=0
  while i < dna.length do
    if dna[i] == "T"
      final += "U"
    else
      final += dna[i]
    end
  i += 1
  end
  return final
end


An AI has infected a text with a character!!

This text is now fully mutated to this character.

If the text or the character are empty, return an empty string.
There never will be a case when both are empty as nothing is going on!!

The character is a string. It will always be of length 1 if it's not empty.

Example:

before = "abc"
character = "z"
after = "zzz"


function contamination(text, char){
  if (text === "" || char === "") {
    return ""
  } else {
    return text.replace(/./g, char)
  }
}


Description:
Remove all exclamation marks from the end of sentence.

Examples
remove("Hi!") === "Hi"
remove("Hi!!!") === "Hi"
remove("!Hi") === "!Hi"
remove("!Hi!") === "!Hi"
remove("Hi! Hi!") === "Hi! Hi"
remove("Hi") === "Hi"
Note
Please don't post issue about difficulty or duplicate.


function remove(s){
  var exRegex = /!*$/
  var answer = s.replace(exRegex, "")
  return answer
}


Create a function called shortcut to remove all the lowercase vowels in a given string.

Examples
shortcut("codewars") // --> cdwrs
shortcut("goodbye")  // --> gdby
Don't worry about uppercase vowels.


function shortcut(string){
  var final = string.replace(/[aeiou]/g, "")
  return final
}


Description:
Replace all vowel to exclamation mark in the sentence. aeiouAEIOU is vowel.

Examples
replace("Hi!") === "H!!"
replace("!Hi! Hi!") === "!H!! H!!"
replace("aeiou") === "!!!!!"
replace("ABCDE") === "!BCD!"
Note
Please don't post issue about difficulty or duplicate. Because:

That's unfair on the kata creator. This is a valid kata and introduces new people to javascript some regex or loops, depending on how they tackle this problem. --matt c

function replace(s){
  var final = s.replace(/[aeiouAEIOU]/g, "!")
  return final
}



Write a function which removes from string all non-digit characters and parse the remaining to number. E.g: "hell5o wor6ld" -> 56

Function:

####javascript

getNumberFromString(s)
####ruby

get_number_from_string(s)
####CSharp

GetNumberFromString(string s)

function getNumberFromString(s) {
  var numRegex = /[0-9]+/g
  var answer = s.match(numRegex)
  return Number(answer.join(""))
}


