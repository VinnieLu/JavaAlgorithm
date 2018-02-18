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




