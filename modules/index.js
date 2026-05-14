window.CT8 = window.CT8 || {};
window.CT8.modules = [
  {
    "id": "squares-cubes",
    "shortTitle": "Squares Cubes",
    "title": "A Square and a Cube",
    "skill": "perfect powers",
    "theme": "blue",
    "visual": "geometry",
    "intro": "Numbers can take the shape of a square or a cube! 4 × 4 makes a perfect square (16, a 4-by-4 grid). 3 × 3 × 3 makes a perfect cube (27, a 3-by-3-by-3 block). In this module you'll spot the patterns hiding inside numbers, hunt for the rare ones that are both square and cube — like 64 — and learn tricks that turn hard problems into one-line answers.",
    "lessons": [
      {
        "title": "Perfect Squares",
        "text": "A number times itself. 4 × 4 = 16, so 16 fills a 4-by-4 grid exactly. Try it: 1, 4, 9, 16, 25 …"
      },
      {
        "title": "Perfect Cubes",
        "text": "A number times itself, three times. 3 × 3 × 3 = 27, so 27 stacks into a 3-by-3-by-3 block. Cubes grow fast: 1, 8, 27, 64, 125 …"
      },
      {
        "title": "Spot the Trick",
        "text": "Break a number into its building blocks to check if it's a square or cube. Then spot shortcuts — like 50² − 49² = 50 + 49 = 99. Patterns make math fast."
      }
    ],
    "activity": {
      "title": "Power Builder",
      "prompt": "Break the number into factors, then rebuild it as a square or cube.",
      "tip": "When a problem asks you to square or cube something, try picturing it as an actual square grid or cube stack — the shape often makes the structure obvious and points you to the solution.",
      "chips": [
        {
          "title": "12 squared",
          "text": "12 x 12 = 144."
        },
        {
          "title": "5 cubed",
          "text": "5 x 5 x 5 = 125."
        },
        {
          "title": "40 x k",
          "text": "Since 40 = 2^3 x 5, multiply by 25 to make a cube."
        },
        {
          "title": "Overlap",
          "text": "1 and 64 are both perfect squares and perfect cubes."
        }
      ]
    },
    "checks": [
      {
        "title": "CT move",
        "text": "Pattern recognition connects exponents with repeated multiplication."
      },
      {
        "title": "Math link",
        "text": "Prime factors explain why some numbers are squares or cubes."
      }
    ],
    "quiz": [
      {
        "text": "Pattern Power",
        "format": {
          "title": "Pattern Power",
          "intro": "Look at the pattern:",
          "equations": [
            "2² - 1² = 3",
            "3² - 2² = 5",
            "4² - 3² = 7"
          ],
          "ask": "Find 50² - 49². What is the product of its digits?"
        },
        "options": [
          "9",
          "18",
          "0",
          "81"
        ],
        "answer": 3,
        "animation": {
          "type": "patternPower",
          "title": "n² - (n-1)² = ?"
        },
        "clue": "50² - 49² = (50 - 49)(50 + 49) = 99, and 9 x 9 = 81."
      },
      {
        "text": "The Grid Challenge",
        "format": {
          "type": "gridChallenge",
          "title": "The Grid Challenge",
          "intro": "Fill the grid so every row and column uses 1, 2, and 3 exactly once.",
          "rules": [
            {
              "label": "Rows",
              "text": "1, 2, 3 once"
            },
            {
              "label": "Columns",
              "text": "1, 2, 3 once"
            },
            {
              "label": "Main diagonal",
              "text": "Top-left to bottom-right"
            }
          ],
          "ask": "Make the main diagonal (top-left to bottom-right) as large as possible. What is the maximum sum?"
        },
        "options": [
          "6",
          "9",
          "7",
          "5"
        ],
        "answer": 1,
        "clue": "A valid grid can put 3 on all diagonal cells, so the maximum is 3 + 3 + 3 = 9."
      },
      {
        "text": "Make 40 a Perfect Cube",
        "format": {
          "type": "cubeCompletion",
          "title": "Make 40 a Perfect Cube",
          "intro": "A perfect cube is the same number multiplied 3 times.",
          "examples": [
            {
              "value": "8",
              "factors": [
                "2",
                "2",
                "2"
              ]
            },
            {
              "value": "27",
              "factors": [
                "3",
                "3",
                "3"
              ]
            }
          ],
          "given": {
            "label": "Now complete 40:",
            "value": "40",
            "factors": [
              "2",
              "2",
              "2",
              "5"
            ]
          },
          "target": [
            "40",
            "k",
            "n",
            "n",
            "n"
          ],
          "ask": "What should k be?"
        },
        "options": [
          "5",
          "10",
          "25",
          "40"
        ],
        "answer": 2,
        "hint": [
          {
            "label": "Step 1",
            "text": "Break 40 into prime factors: 40 = 2 x 2 x 2 x 5."
          },
          {
            "label": "Step 2",
            "text": "Perfect cubes need groups of 3. The 2s are complete, so complete the group of 5s."
          }
        ],
        "clue": "40 = 2 x 2 x 2 x 5. Add two more 5s, so multiply by 25."
      },
      {
        "text": "Sum from 1 to 100",
        "format": {
          "type": "gaussSum",
          "title": "Gauss and the Sum from 1 to 100",
          "story": [
            "A famous story says that in the late 1700s, a teacher asked the class to add all the numbers from 1 to 100. He thought it would take a long time.",
            "Young Carl Gauss looked at the problem carefully and finished in seconds. He found a smarter pattern instead of adding every number one by one."
          ],
          "equation": "1 + 2 + 3 + ... + 100",
          "ask": "What is 1 + 2 + 3 + ... + 100?"
        },
        "options": [
          "5000",
          "5100",
          "5050",
          "4950"
        ],
        "answer": 2,
        "hint": {
          "image": "assets/gauss-classroom.png",
          "alt": "Young Carl Gauss solving the sum from 1 to 100 on a classroom slate",
          "steps": [
            {
              "label": "Step 1",
              "text": "Pair the first and last numbers: 1 + 100 = 101."
            },
            {
              "label": "Step 2",
              "text": "Keep pairing: 2 + 99 = 101, 3 + 98 = 101, and so on."
            },
            {
              "label": "Step 3",
              "text": "There are 50 pairs, so multiply 50 x 101."
            }
          ]
        },
        "clue": "There are 50 pairs, and each pair makes 101. So 50 x 101 = 5050."
      },
      {
        "text": "Column Rules",
        "format": {
          "type": "columnRules",
          "title": "Column Rules",
          "intro": "Look at the relationship between the numbers in each row:",
          "headers": [
            "Col 1",
            "Col 2",
            "Col 3"
          ],
          "rows": [
            [
              "4",
              "16",
              "20"
            ],
            [
              "7",
              "49",
              "56"
            ],
            [
              "9",
              "81",
              "?"
            ]
          ],
          "ask": "What number should replace the question mark?"
        },
        "options": [
          "90",
          "100",
          "72",
          "89"
        ],
        "answer": 0,
        "hint": "In each row, the third number is the first number plus the second number.\nFor example: 4 + 16 = 20 and 7 + 49 = 56.",
        "clue": "Use the same rule in the last row: 9 + 81 = 90."
      },
      {
        "text": "A list must contain 3 perfect squares and 3 perfect cubes, all at most two digits. What is the minimum number of distinct numbers needed?",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ],
        "answer": 1,
        "clue": "Use numbers like 1 and 64 that count as both."
      },
      {
        "text": "Number Machine",
        "format": {
          "title": "Number Machine",
          "intro": "Numbers pass through a machine and change like this:",
          "equations": [
            "Input 5 -> Output 26",
            "Input 8 -> Output 65",
            "Input 10 -> Output 101"
          ],
          "ask": "If the input is 12, what is the output?"
        },
        "options": [
          "144",
          "145",
          "121",
          "169"
        ],
        "answer": 1,
        "hint": "Look at the input and output together.\n5 x 5 + 1 = 26, 8 x 8 + 1 = 65, and 10 x 10 + 1 = 101.",
        "clue": "The rule is input x input + 1. So 12 x 12 + 1 = 145."
      },
      {
        "text": "What is the sum of the square of 9 and the cube of 4?",
        "options": [
          "125",
          "135",
          "145",
          "155"
        ],
        "answer": 2,
        "clue": "81 + 64."
      },
      {
        "text": "How many perfect squares lie between 30² and 31²?",
        "options": [
          "60",
          "61",
          "0",
          "30"
        ],
        "answer": 2,
        "hint": "30² and 31² are consecutive perfect squares. There is no whole number between 30 and 31 to square.",
        "clue": "There are no perfect squares between two consecutive perfect squares, so the answer is 0."
      },
      {
        "text": "What is the difference between the cube of 2 and the square of 2?",
        "options": [
          "2",
          "3",
          "4",
          "6"
        ],
        "answer": 2,
        "clue": "8 - 4."
      }
    ]
  },
  {
    "id": "power-play",
    "shortTitle": "Powers",
    "title": "Power Play",
    "skill": "exponents and combinations",
    "theme": "pink",
    "visual": "data",
    "intro": "Power Play focuses on exponential forms, repeated patterns, combinations, and choosing values under rules.",
    "lessons": [
      {
        "title": "Exponent Value",
        "text": "Compare powers by calculating or using known benchmarks."
      },
      {
        "title": "Growth Rules",
        "text": "Some sequences grow by multiplying and then adjusting by a small amount."
      },
      {
        "title": "Combinations",
        "text": "Pairing one item from each group uses multiplication."
      }
    ],
    "activity": {
      "title": "Exponent Sort",
      "prompt": "Convert enough of each expression to compare it correctly.",
      "hideCard": true,
      "chips": [
        {
          "title": "2^5",
          "text": "2^5 = 32."
        },
        {
          "title": "6, 26, 126",
          "text": "The rule is multiply by 5 and subtract 4."
        },
        {
          "title": "Cubes",
          "text": "16^3 = 4096 and 17^3 = 4913."
        },
        {
          "title": "Pairing",
          "text": "4 choices and 6 choices make 24 pairs."
        }
      ]
    },
    "checks": [
      {
        "title": "CT move",
        "text": "Algorithmic thinking follows a repeated rule exactly."
      },
      {
        "title": "Math link",
        "text": "Exponents model fast repeated multiplication."
      }
    ],
    "quiz": [
      {
        "text": "What comes next: 6, 26, 126, 626, ?",
        "options": [
          "3026",
          "3125",
          "3126",
          "3130"
        ],
        "answer": 2,
        "clue": "Multiply by 5, then subtract 4."
      },
      {
        "text": "The Pattern Breaker",
        "format": {
          "title": "The Pattern Breaker",
          "intro": "Look at the following series:",
          "equations": [
            "7, 50, 344, 2402, ?"
          ],
          "ask": "Identify the logic used to generate the next number. What is the value of the missing term?"
        },
        "options": [
          "16807",
          "16808",
          "2403",
          "16814"
        ],
        "answer": 1,
        "hint": "Think about powers of 7 and how they relate to these numbers.",
        "clue": "50 = 7^2 + 1, 344 = 7^3 + 1, and 2402 = 7^4 + 1. So the next term is 7^5 + 1 = 16808."
      },
      {
        "text": "Arrange 3^2, 2^4, and 5^2 in ascending value.",
        "options": [
          "3^2, 2^4, 5^2",
          "2^4, 3^2, 5^2",
          "5^2, 2^4, 3^2",
          "3^2, 5^2, 2^4"
        ],
        "answer": 0,
        "clue": "Their values are 9, 16, and 25."
      },
      {
        "text": "A rule says if the base is smaller than the exponent, replace the base n with 1/n. What does 2^5 become?",
        "options": [
          "(1/2)^5",
          "2^(1/5)",
          "5^2",
          "2^5"
        ],
        "answer": 0,
        "clue": "The base 2 is smaller than exponent 5."
      },
      {
        "text": "For a cube between 4000 and 5000, what is the smallest possible two-digit base?",
        "options": [
          "15",
          "16",
          "17",
          "18"
        ],
        "answer": 1,
        "clue": "16^3 = 4096."
      },
      {
        "text": "How many pairs can be made from 4 owls and 6 trees by choosing one owl and one tree?",
        "options": [
          "10",
          "18",
          "24",
          "30"
        ],
        "answer": 2,
        "animation": {
          "type": "owlTreePairs",
          "title": "One owl choice with one tree choice",
          "owls": 4,
          "trees": 6
        },
        "hint": [
          {
            "label": "Step 1",
            "text": "Pick one owl first. That owl can pair with any of the 6 trees."
          },
          {
            "label": "Step 2",
            "text": "There are 4 owls, so make 4 rows of 6 tree choices."
          },
          {
            "label": "Step 3",
            "text": "Count the rows by multiplying: 4 x 6."
          }
        ],
        "clue": "Use 4 x 6."
      },
      {
        "text": "Find the two-digit number AB",
        "format": {
          "type": "digitClues",
          "title": "Find the two-digit number AB",
          "intro": "AB is one two-digit number, not A x B. For example, if A = 4 and B = 6, then AB = 46.",
          "rangeLabel": "The square of AB is between:",
          "range": "2000 < (AB)^2 < 3000",
          "cluesTitle": "Use all three clues:",
          "clues": [
            {
              "label": "1",
              "text": "A + B is even."
            },
            {
              "label": "2",
              "text": "The square (AB)^2 ends with the same last digit as AB."
            },
            {
              "label": "3",
              "text": "The tens digit A is even."
            }
          ],
          "ask": "Which option is the value of AB?"
        },
        "options": [
          "46",
          "48",
          "52",
          "54"
        ],
        "answer": 0,
        "hint": "First find numbers whose squares lie between 2000 and 3000. Then test the digit-sum, last-digit, and tens-digit clues.",
        "clue": "46^2 = 2116, 4 + 6 = 10 is even, 2116 ends in 6, and the tens digit 4 is even."
      },
      {
        "text": "The Science Fair Committee",
        "format": {
          "type": "committeeRules",
          "title": "The Science Fair Committee",
          "intro": "Choose a 3-person committee from these students:",
          "people": [
            "Maya",
            "Noah",
            "Olivia",
            "Paul",
            "Quinn",
            "Riley"
          ],
          "badge": "Choose 3",
          "rules": [
            "Maya and Noah must either both be chosen or both left out.",
            "Paul and Olivia cannot be on the same committee.",
            "If Quinn is chosen, Riley must also be chosen."
          ],
          "ask": "How many different valid committees can be formed?"
        },
        "options": [
          "1",
          "2",
          "3",
          "5"
        ],
        "answer": 3,
        "hint": "Split into cases: Maya and Noah together, or Maya and Noah both absent. Then apply the Olivia-Paul and Quinn-Riley rules.",
        "clue": "With Maya and Noah together: MNO, MNP, MNR = 3 committees. With both absent: OQR and PQR = 2 committees. Total = 5."
      },
      {
        "text": "Which is greatest?",
        "options": [
          "5^4",
          "2^8",
          "3^6",
          "4^4"
        ],
        "answer": 2,
        "animation": {
          "type": "powerSquareCompare",
          "title": "Compare powers as square sides",
          "items": [
            {
              "label": "A",
              "power": "5^4",
              "split": "5^2 x 5^2",
              "square": "25 x 25",
              "side": 25
            },
            {
              "label": "B",
              "power": "2^8",
              "split": "2^4 x 2^4",
              "square": "16 x 16",
              "side": 16
            },
            {
              "label": "C",
              "power": "3^6",
              "split": "3^3 x 3^3",
              "square": "27 x 27",
              "side": 27
            },
            {
              "label": "D",
              "power": "4^4",
              "split": "4^2 x 4^2",
              "square": "16 x 16",
              "side": 16
            }
          ]
        },
        "hint": [
          {
            "label": "Square trick",
            "text": "Break each power into two equal parts, like making a square."
          },
          {
            "label": "Compare",
            "text": "5^4 = 5^2 x 5^2 = 25 x 25. 2^8 = 2^4 x 2^4 = 16 x 16."
          },
          {
            "label": "Finish",
            "text": "3^6 = 3^3 x 3^3 = 27 x 27, and 4^4 = 4^2 x 4^2 = 16 x 16. The biggest side is 27."
          }
        ],
        "clue": "The values are 625, 256, 729, and 256."
      },
      {
        "text": "A bag capacity is 2^4 units. How many units is that?",
        "options": [
          "8",
          "12",
          "16",
          "24"
        ],
        "answer": 2,
        "clue": "2^4 = 16."
      }
    ]
  },
  {
    "id": "number-systems",
    "shortTitle": "Number Systems",
    "title": "A Story of Numbers",
    "skill": "bases and representations",
    "theme": "teal",
    "visual": "numberline",
    "intro": "Numbers can be represented in decimal, binary, ternary, Roman numerals, and physical models such as abacus poles.",
    "video": {
      "title": "Watch: A Story of Numbers",
      "url": "https://www.youtube.com/watch?v=bT_hDTvGAt8",
      "embed": "https://www.youtube.com/embed/bT_hDTvGAt8"
    },
    "lessons": [
      {
        "title": "Decimal Pipes",
        "text": "Base 10 uses powers of 10 and digits 0 to 9."
      },
      {
        "title": "Binary Pipes",
        "text": "Base 2 uses powers of 2 and only digits 0 and 1."
      },
      {
        "title": "Ternary Pipes",
        "text": "Base 3 uses powers of 3 and digits 0, 1, and 2."
      }
    ],
    "activity": {
      "label": "Quick facts",
      "title": "Why Number Bases Matter",
      "prompt": "The same quantity can be written in many bases. Different bases became useful for different reasons.",
      "hideVisual": true,
      "facts": [
        {
          "title": "Why do people use base 10?",
          "text": "Because humans usually count with ten fingers. Groups of ten became natural for counting, trade, money, measurement, and place value."
        },
        {
          "title": "Why do computers use base 2?",
          "text": "Computer circuits are easiest to make reliable with two states: off/on or low/high voltage. Those two states are represented as 0 and 1."
        },
        {
          "title": "Why do programmers use base 16?",
          "text": "Hexadecimal is a short way to write binary. One hex digit matches exactly four binary bits, so long 0-1 patterns become easier to read."
        },
        {
          "title": "Does the value change?",
          "text": "No. The value stays the same; only the representation changes. For example, decimal 10 is written as 1010 in binary."
        }
      ]
    },
    "checks": [
      {
        "title": "CT move",
        "text": "Data representation lets the same value appear in different systems."
      },
      {
        "title": "Math link",
        "text": "Every base uses powers of its base number."
      }
    ],
    "quiz": [
      {
        "text": "How many decimal pipes are needed to represent 66 using tens and ones?",
        "options": [
          "6",
          "7",
          "12",
          "66"
        ],
        "answer": 2,
        "animation": {
          "type": "decimalPipes",
          "target": 66,
          "pipes": [
            {
              "label": "10-pipe",
              "value": 10
            },
            {
              "label": "1-pipe",
              "value": 1
            }
          ]
        },
        "clue": "Use six 10-inch pipes and six 1-inch pipes."
      },
      {
        "text": "Which binary pipes represent 66?",
        "options": [
          "64 and 2",
          "32 and 34",
          "63 and 3",
          "16 and 50"
        ],
        "answer": 0,
        "clue": "66 = 64 + 2."
      },
      {
        "text": "What is binary representation of decimal 10?",
        "options": [
          "1010",
          "1111",
          "1000",
          "1100"
        ],
        "answer": 0,
        "animation": {
          "type": "binaryPlaceValue",
          "decimal": 10,
          "places": [
            8,
            4,
            2,
            1
          ],
          "bits": [
            1,
            0,
            1,
            0
          ]
        },
        "clue": "10 = 8 + 2."
      },
      {
        "text": "What is 66 in base 3?",
        "options": [
          "2011",
          "2101",
          "2110",
          "2210"
        ],
        "answer": 2,
        "animation": {
          "type": "basePlaceValue",
          "base": 3,
          "target": 66,
          "places": [
            27,
            9,
            3,
            1
          ],
          "answerDigits": [
            2,
            1,
            1,
            0
          ]
        },
        "hint": [
          {
            "label": "Step 1",
            "text": "Use base-3 place values: 27, 9, 3, and 1."
          },
          {
            "label": "Step 2",
            "text": "66 has two 27s: 2 x 27 = 54. Remainder: 12."
          },
          {
            "label": "Step 3",
            "text": "12 has one 9, one 3, and zero 1s. So the digits are 2, 1, 1, 0."
          }
        ],
        "clue": "66 = 2 x 27 + 1 x 9 + 1 x 3 + 0 x 1."
      },
      {
        "text": "What is the largest digit allowed in base 3?",
        "options": [
          "1",
          "2",
          "3",
          "9"
        ],
        "answer": 1,
        "clue": "Base n uses digits 0 to n - 1."
      },
      {
        "text": "How is decimal 100 written in base 3?",
        "options": [
          "10201",
          "11000",
          "20101",
          "10010"
        ],
        "answer": 0,
        "animation": {
          "type": "basePlaceValue",
          "base": 3,
          "target": 100,
          "places": [
            81,
            27,
            9,
            3,
            1
          ],
          "answerDigits": [
            1,
            0,
            2,
            0,
            1
          ]
        },
        "hint": [
          {
            "label": "Step 1",
            "text": "Use base-3 place values: 81, 27, 9, 3, and 1."
          },
          {
            "label": "Step 2",
            "text": "100 has one 81. Remainder: 19."
          },
          {
            "label": "Step 3",
            "text": "19 has zero 27s, two 9s, zero 3s, and one 1. So the digits are 1, 0, 2, 0, 1."
          }
        ],
        "clue": "100 = 81 + 18 + 1."
      },
      {
        "text": "Which is larger: Roman IX or Roman XIV?",
        "options": [
          "IX",
          "XIV",
          "both equal",
          "cannot tell"
        ],
        "answer": 1,
        "clue": "IX is 9 and XIV is 14."
      },
      {
        "text": "What comes next in Roman numerals: VI, VII, VIII, ?",
        "options": [
          "IV",
          "IX",
          "XI",
          "XV"
        ],
        "answer": 1,
        "clue": "The sequence is 6, 7, 8, 9."
      },
      {
        "text": "What is the largest digit allowed in base 5?",
        "options": [
          "3",
          "4",
          "5",
          "9"
        ],
        "answer": 1,
        "clue": "Digits go from 0 to 4."
      },
      {
        "text": "What decimal value is binary 1111?",
        "options": [
          "12",
          "13",
          "14",
          "15"
        ],
        "answer": 3,
        "animation": {
          "type": "basePlaceValue",
          "base": 2,
          "target": 15,
          "places": [
            8,
            4,
            2,
            1
          ],
          "answerDigits": [
            1,
            1,
            1,
            1
          ],
          "source": "1111"
        },
        "hint": [
          {
            "label": "Step 1",
            "text": "Write the binary place values: 8, 4, 2, and 1."
          },
          {
            "label": "Step 2",
            "text": "In 1111, every place is ON because every digit is 1."
          },
          {
            "label": "Step 3",
            "text": "Add all the ON values: 8 + 4 + 2 + 1."
          }
        ],
        "clue": "8 + 4 + 2 + 1."
      }
    ]
  },
  {
    "id": "quadrilaterals",
    "shortTitle": "Quadrilaterals",
    "title": "Quadrilaterals",
    "skill": "shape classification",
    "theme": "yellow",
    "visual": "geometry",
    "intro": "Quadrilateral puzzles require sorting shapes by properties such as parallel sides, equal sides, right angles, and diagonals.",
    "lessons": [
      {
        "title": "Families",
        "text": "Squares, rectangles, rhombuses, parallelograms, trapeziums, and kites can share properties."
      },
      {
        "title": "Diagonals",
        "text": "Some quadrilaterals have diagonals that bisect each other, meet at right angles, or both."
      },
      {
        "title": "Counting Shapes",
        "text": "When a figure is divided by lines, count small and large shapes systematically."
      }
    ],
    "activity": {
      "title": "Property Sorter",
      "prompt": "Place each property card into every family where it belongs.",
      "chips": [
        {
          "title": "Square",
          "text": "All sides equal, all angles 90 degrees, two pairs of parallel sides."
        },
        {
          "title": "Rectangle",
          "text": "Opposite sides equal and all angles 90 degrees."
        },
        {
          "title": "Rhombus",
          "text": "All sides equal and opposite sides parallel."
        },
        {
          "title": "Kite",
          "text": "Two pairs of adjacent equal sides."
        }
      ]
    },
    "checks": [
      {
        "title": "CT move",
        "text": "Classification depends on testing properties in a consistent order."
      },
      {
        "title": "Math link",
        "text": "Quadrilateral families overlap; a square belongs to more than one family."
      }
    ],
    "quiz": [
      {
        "text": "How many quadrilaterals (four-sided shapes) can you find in this figure?",
        "options": [
          "10",
          "11",
          "12",
          "13"
        ],
        "answer": 3,
        "figure": {
          "type": "quadrilateralGrid"
        },
        "clue": "There are 9 rectangles from the 2 by 2 grid, plus 4 more quadrilaterals formed using the diagonal. Total = 13."
      },
      {
        "text": "In geometry, we often say one shape is a type of another. Based on the properties of sides and angles, which statement is always true?",
        "options": [
          "Every Rhombus is a Square.",
          "Every Rectangle is a Parallelogram.",
          "A Kite is a type of Trapezium.",
          "A Parallelogram is a type of Rectangle."
        ],
        "answer": 1,
        "hint": "Check which shape always has the properties of the larger family.",
        "clue": "A rectangle always has two pairs of parallel opposite sides, so every rectangle is a parallelogram."
      },
      {
        "text": "Imagine you are a floor designer. You have an unlimited supply of identical scalene quadrilaterals, where no sides or angles are equal. Is it possible to tile a flat floor using only these identical quadrilaterals without gaps or overlaps?",
        "options": [
          "Yes, any quadrilateral can tessellate.",
          "No, only squares can tessellate.",
          "No, scalene quadrilaterals never tessellate.",
          "Yes, but only if all angles are 90 degrees."
        ],
        "answer": 0,
        "animation": {
          "type": "quadrilateralTessellation"
        },
        "hint": "Try placing copies around a vertex. The four angles of any quadrilateral add to 360 degrees.",
        "clue": "Yes. Any quadrilateral can tessellate because its four angles can meet around a point to make 360 degrees."
      },
      {
        "text": "A robot is programmed to identify a shape. It detects that the shape has four equal sides, but the diagonals are not equal. Which shape has the robot found?",
        "options": [
          "square",
          "rectangle",
          "rhombus",
          "trapezium"
        ],
        "answer": 2,
        "hint": "A square has four equal sides and equal diagonals. This shape has four equal sides but unequal diagonals.",
        "clue": "A rhombus has four equal sides, but its diagonals are not necessarily equal."
      },
      {
        "text": "Which property is unique to a kite among these choices?",
        "options": [
          "Two distinct pairs of adjacent equal sides",
          "Two pairs of parallel opposite sides",
          "All angles are 90 degrees",
          "All four sides are equal"
        ],
        "answer": 0,
        "hint": "Adjacent sides touch each other. A kite is built from equal side pairs next to each other.",
        "clue": "A kite has two distinct pairs of adjacent equal sides."
      },
      {
        "text": "If you decompose a parallelogram by drawing one diagonal, you always get two congruent shapes. What are they?",
        "options": [
          "two congruent triangles",
          "two congruent circles",
          "two congruent pentagons",
          "two unequal quadrilaterals"
        ],
        "answer": 0,
        "hint": "A diagonal connects two opposite vertices and splits the parallelogram into two matching halves.",
        "clue": "The diagonal of a parallelogram divides it into two congruent triangles."
      },
      {
        "text": "Two identical triangles joined along one full side can form which kind of figure?",
        "options": [
          "quadrilateral",
          "circle",
          "line only",
          "cube only"
        ],
        "answer": 0,
        "clue": "The outer boundary can have four sides."
      },
      {
        "text": "Which property is always true for a rectangle?",
        "options": [
          "opposite sides are equal",
          "all sides are different",
          "diagonals do not exist",
          "one angle is 60 degrees"
        ],
        "answer": 0,
        "clue": "Rectangles have equal opposite sides."
      },
      {
        "text": "Which quadrilateral has exactly one pair of parallel opposite sides?",
        "options": [
          "trapezium",
          "rectangle",
          "rhombus",
          "square"
        ],
        "answer": 0,
        "clue": "A trapezium has exactly one pair of parallel opposite sides."
      },
      {
        "text": "How many lines of symmetry does a square have?",
        "options": [
          "1",
          "2",
          "4",
          "8"
        ],
        "answer": 2,
        "clue": "Count vertical, horizontal, and two diagonals."
      }
    ]
  },
  {
    "id": "number-play",
    "shortTitle": "Number Play",
    "title": "Number Play",
    "skill": "divisibility and remainders",
    "theme": "blue",
    "visual": "data",
    "intro": "These puzzles combine divisibility, multiples, remainders, ordered lists, and positional constraints.",
    "lessons": [
      {
        "title": "Divisibility",
        "text": "Digit sums, last digits, and common multiples can quickly identify valid numbers."
      },
      {
        "title": "Remainders",
        "text": "A game can be decided by the remainder after division."
      },
      {
        "title": "Arrangement Rules",
        "text": "Position clues can force a unique order of numbers or switches."
      }
    ],
    "activity": {
      "title": "Remainder Game",
      "prompt": "Use the rule before trying large numbers. Often the smallest winning pair appears early.",
      "chips": [
        {
          "title": "Divisible by 9",
          "text": "A number is divisible by 9 when its digit sum is divisible by 9."
        },
        {
          "title": "Multiple boxes",
          "text": "A number divisible by both 4 and 6 belongs in both boxes."
        },
        {
          "title": "Remainder",
          "text": "For division by 25, check products modulo 25."
        },
        {
          "title": "Spacing",
          "text": "Exactly two fan switches between lights creates a repeating gap."
        }
      ]
    },
    "checks": [
      {
        "title": "CT move",
        "text": "Constraint filtering reduces a large search to a few candidates."
      },
      {
        "title": "Math link",
        "text": "Divisibility and modular arithmetic support quick checking."
      }
    ],
    "quiz": [
      {
        "text": "Five numbers start at 16 and increase by 8 each time: 16, 24, 32, 40, 48. Which is divisible by 32?",
        "options": [
          "16",
          "24",
          "32",
          "40"
        ],
        "answer": 2,
        "clue": "32 is 32 x 1."
      },
      {
        "text": "A number is divisible by 9 when:",
        "options": [
          "its last digit is 9",
          "its digit sum is divisible by 9",
          "it is even",
          "it has six digits"
        ],
        "answer": 1,
        "clue": "Use the digit-sum test."
      },
      {
        "text": "From 1 to 24, how many numbers are multiples of both 4 and 6?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "answer": 1,
        "clue": "Multiples of both are multiples of 12: 12 and 24."
      },
      {
        "text": "What is the least possible sum of two different two-digit numbers that are divisible by 9 but not by 18?",
        "options": [
          "54",
          "63",
          "72",
          "81"
        ],
        "answer": 2,
        "clue": "The smallest such two-digit numbers are 27 and 45."
      },
      {
        "text": "Two different numbers from 2 to 24 are multiplied. Ashish wins if the remainder after division by 25 is more than 14. What is the minimum possible sum of the chosen numbers?",
        "options": [
          "7",
          "8",
          "9",
          "10"
        ],
        "answer": 1,
        "clue": "3 x 5 gives remainder 15 and sum 8."
      },
      {
        "text": "In 2020, Simran's age was a multiple of 6. In 2024, her age was a multiple of 11. Which could be her age in 2024?",
        "options": [
          "11",
          "22",
          "33",
          "44"
        ],
        "answer": 1,
        "clue": "Subtract 4 and test for a multiple of 6."
      },
      {
        "text": "The middle number of five consecutive even numbers is 5p. Which p works if exactly two numbers are divisible by 4 and only one is divisible by 5?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": 0,
        "clue": "Try p = 2: 6, 8, 10, 12, 14."
      },
      {
        "text": "A number divisible by 2, 3, and 5 must be divisible by:",
        "options": [
          "12",
          "15",
          "20",
          "30"
        ],
        "answer": 3,
        "clue": "Use the least common multiple."
      },
      {
        "text": "There are 9 switches in a row and 3 are lights. Exactly two fan switches sit between consecutive light switches. The leftmost switch is a light and the rightmost is not. Which positions are lights?",
        "options": [
          "1, 4, 7",
          "1, 5, 9",
          "2, 5, 8",
          "3, 6, 9"
        ],
        "answer": 0,
        "clue": "Start at 1 and leave two gaps each time."
      },
      {
        "text": "Which number is divisible by both 4 and 6?",
        "options": [
          "18",
          "20",
          "24",
          "30"
        ],
        "answer": 2,
        "clue": "It must be divisible by 12."
      }
    ]
  },
  {
    "id": "distribution",
    "shortTitle": "Distribute",
    "title": "We Distribute Yet Things Multiply",
    "skill": "distribution and expressions",
    "theme": "teal",
    "visual": "data",
    "intro": "Distribution problems connect multiplication, grouping, algebraic expansion, schedules, and stepwise resource sharing.",
    "lessons": [
      {
        "title": "Distributive Form",
        "text": "a(b + c) is the same as ab + ac."
      },
      {
        "title": "Resource Sharing",
        "text": "Distribute in stages and check any condition before continuing."
      },
      {
        "title": "Schedule Counting",
        "text": "Workday rules can be converted into counts, then multiplied by work per day."
      }
    ],
    "activity": {
      "title": "Pack Counter",
      "prompt": "Keep track of groups, packs per group, and whether the second distribution happens.",
      "chips": [
        {
          "title": "3(6 x 4)",
          "text": "Three children each receive four packs of six coins."
        },
        {
          "title": "Check half",
          "text": "Only perform a conditional second step after comparing the remaining amount."
        },
        {
          "title": "Expand",
          "text": "(a + b)(c + d) expands into four products."
        },
        {
          "title": "Simplify",
          "text": "Matching terms can cancel after subtraction."
        }
      ]
    },
    "checks": [
      {
        "title": "CT move",
        "text": "Algorithm design keeps multi-step distributions in order."
      },
      {
        "title": "Math link",
        "text": "The distributive property links arithmetic and algebra."
      }
    ],
    "quiz": [
      {
        "text": "Weighing Scale Logic",
        "format": {
          "title": "Weighing Scale Logic",
          "intro": "On a weighing scale, both a and b are whole numbers.",
          "ask": "Which conclusion is logically correct?"
        },
        "figure": {
          "type": "image",
          "src": "assets/scale-expression-balance.svg",
          "alt": "A weighing scale with left side expression (a - b) squared and right side expression a squared minus b squared"
        },
        "options": [
          "The scale can balance only when b = 0 or a = b",
          "The scale can balance for any values of a and b",
          "The scale can balance only when a = b = 0",
          "The scale can never balance"
        ],
        "answer": 0,
        "hint": "Expand both sides and compare what must be true for them to be equal.",
        "clue": "(a - b)^2 = a^2 - 2ab + b^2. Balance means a^2 - 2ab + b^2 = a^2 - b^2, so 2b(b - a) = 0. Therefore b = 0 or a = b."
      },
      {
        "text": "Simplify (a + b)(c + d) - (a - b)(c - d).",
        "options": [
          "2ad + 2bc",
          "2ac + 2bd",
          "ab + cd",
          "a + b + c + d"
        ],
        "answer": 0,
        "clue": "Expand both products and subtract."
      },
      {
        "text": "A merchant has 15^2 - 1 coins. Three children first get 4 packs of 6 coins each. Since more than half remains, each child also gets 3 packs of 6 coins. How many coins remain?",
        "options": [
          "80",
          "88",
          "98",
          "108"
        ],
        "answer": 2,
        "clue": "Start with 224 and subtract 72 and 54."
      },
      {
        "text": "Three painters work for 14 days starting Monday. A skips weekends, B skips every 5th day, and C works all days. Each paints 3 rooms per working day. How many rooms are painted?",
        "options": [
          "96",
          "102",
          "108",
          "126"
        ],
        "answer": 2,
        "clue": "A works 10 days, B works 12 days, C works 14 days."
      },
      {
        "text": "A train has 100 passengers from A to B. At B, 40 leave and 30 enter. At C, 50 leave and 20 enter. Segment ticket prices are 1, 2, and 1. What is the total ticket cost?",
        "options": [
          "300",
          "320",
          "340",
          "360"
        ],
        "answer": 2,
        "clue": "Segment counts are 100, 90, and 60."
      },
      {
        "text": "From 1 to 24, how many numbers go into both Box 1 (multiples of 4) and Box 2 (multiples of 6)?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "answer": 1,
        "clue": "Use multiples of 12."
      },
      {
        "text": "Which expression is equal to 5 x 7 + 5 x 3?",
        "options": [
          "5(7 + 3)",
          "7(5 + 3)",
          "3(5 + 7)",
          "5 + 7 + 3"
        ],
        "answer": 0,
        "clue": "Factor out the common 5."
      },
      {
        "text": "Set k has k marbles and each marble sells for 50 - k rupees. For k from 1 to 49, the maximum sale value is at k = 25 and the minimum is 49. What is the difference?",
        "options": [
          "500",
          "576",
          "600",
          "625"
        ],
        "answer": 1,
        "clue": "25 x 25 - 49."
      },
      {
        "text": "Three children each receive 4 packs of 6 coins. How many coins are distributed?",
        "options": [
          "48",
          "60",
          "72",
          "84"
        ],
        "answer": 2,
        "clue": "3 x 4 x 6."
      },
      {
        "text": "Which code matches 2(ad + bc) if the pattern is 2(pq + rs) -> PQ_2_RS?",
        "options": [
          "AD_2_BC",
          "AC_2_BD",
          "AB_2_CD",
          "AD_3_BC"
        ],
        "answer": 0,
        "clue": "Use the two products inside the bracket around the multiplier 2."
      }
    ]
  },
  {
    "id": "proportional-reasoning",
    "shortTitle": "Proportion",
    "title": "Proportional Reasoning",
    "skill": "ratios and scaling",
    "theme": "yellow",
    "visual": "data",
    "intro": "Proportional reasoning tracks how quantities scale together. Ratios, mixtures, ages, prices, and positions all use the same comparison idea.",
    "lessons": [
      {
        "title": "Equivalent Ratios",
        "text": "Multiplying or dividing both parts of a ratio by the same number keeps the ratio equivalent."
      },
      {
        "title": "Mixtures",
        "text": "Keep milk, water, or other parts separate before forming the final ratio."
      },
      {
        "title": "Scaling",
        "text": "A ratio can describe counts, money, positions, or time."
      }
    ],
    "activity": {
      "title": "Ratio Balancer",
      "prompt": "Write the ratio, scale it, and then answer the exact comparison asked.",
      "chips": [
        {
          "title": "2:3",
          "text": "If one part is 5, the quantities are 10 and 15."
        },
        {
          "title": "3:5",
          "text": "Prices in a ratio stay proportional per dozen or per piece."
        },
        {
          "title": "Mixture",
          "text": "Adding water changes only the water part."
        },
        {
          "title": "Clock",
          "text": "HH:MM can be read as a ratio when both numbers are valid."
        }
      ]
    },
    "checks": [
      {
        "title": "CT move",
        "text": "Abstraction lets one ratio model many different stories."
      },
      {
        "title": "Math link",
        "text": "Proportions preserve multiplicative relationships."
      }
    ],
    "quiz": [
      {
        "text": "Bananas are twice the apples, and strawberries are three times the apples. What is the ratio of bananas to strawberries?",
        "options": [
          "1:2",
          "2:3",
          "3:2",
          "4:3"
        ],
        "answer": 1,
        "animation": {
          "type": "ratioCompare",
          "title": "Stack each fruit against an apple",
          "units": [
            { "label": "apples", "count": 1, "tone": "pink" },
            { "label": "bananas", "count": 2, "tone": "yellow" },
            { "label": "strawberries", "count": 3, "tone": "orange" }
          ],
          "compare": [1, 2],
          "unitLabel": "apple",
          "intro": "1 apple = 1 unit. Bananas = 2 units, strawberries = 3 units.",
          "answer": "Bananas : Strawberries = 2 : 3"
        },
        "clue": "Use apples as one common unit."
      },
      {
        "text": "A:B = 2:5. If A is 8, what is B?",
        "options": [
          "12",
          "16",
          "20",
          "24"
        ],
        "answer": 2,
        "animation": {
          "type": "ratioScale",
          "title": "Scale A:B = 2:5 until A = 8",
          "from": [2, 5],
          "to": [8, 20],
          "factor": 4,
          "labels": ["A", "B"],
          "fromCaption": "2 : 5",
          "toCaption": "8 : 20",
          "answer": "B = 20"
        },
        "clue": "The scale factor from 2 to 8 is 4."
      },
      {
        "text": "A 50-litre mixture has milk and water in the ratio 3:2. How much milk is there?",
        "options": [
          "20 litres",
          "25 litres",
          "30 litres",
          "35 litres"
        ],
        "answer": 2,
        "animation": {
          "type": "ratioBar",
          "title": "Split 50 L in the ratio 3:2",
          "parts": [
            { "label": "milk", "count": 3, "tone": "pink" },
            { "label": "water", "count": 2, "tone": "blue" }
          ],
          "totalValue": 50,
          "unit": " L",
          "highlight": 0
        },
        "clue": "There are 5 total parts, each worth 10 litres."
      },
      {
        "text": "A mixture has 40 litres milk and 20 litres water. How much water should be added to make the ratio 1:1?",
        "options": [
          "10 litres",
          "20 litres",
          "30 litres",
          "40 litres"
        ],
        "answer": 1,
        "animation": {
          "type": "ratioScale",
          "title": "Grow water until milk : water = 1 : 1",
          "from": [40, 20],
          "to": [40, 40],
          "labels": ["milk", "water"],
          "fromCaption": "40 : 20 (now)",
          "toCaption": "40 : 40 (target)",
          "arrowText": "+ 20 L water",
          "stepText": "Milk stays at 40 L, so water has to climb from <strong>20</strong> to <strong>40</strong>.",
          "answer": "Add 20 L of water"
        },
        "clue": "Water must become 40 litres."
      },
      {
        "text": "Which ratio is equivalent to 4:6?",
        "options": [
          "1:3",
          "2:3",
          "3:4",
          "6:4"
        ],
        "answer": 1,
        "animation": {
          "type": "ratioScale",
          "title": "Simplify 4 : 6",
          "from": [4, 6],
          "to": [2, 3],
          "factor": 0.5,
          "labels": ["a", "b"],
          "fromCaption": "4 : 6",
          "toCaption": "2 : 3",
          "answer": "4 : 6 = 2 : 3"
        },
        "clue": "Divide both terms by 2."
      },
      {
        "text": "Three ages are in the ratio 2:3:4 and total 45. What is the middle age?",
        "options": [
          "10",
          "15",
          "20",
          "25"
        ],
        "answer": 1,
        "animation": {
          "type": "ratioBar",
          "title": "Split 45 in the ratio 2:3:4",
          "parts": [
            { "label": "youngest", "count": 2, "tone": "teal" },
            { "label": "middle", "count": 3, "tone": "orange" },
            { "label": "oldest", "count": 4, "tone": "indigo" }
          ],
          "totalValue": 45,
          "unit": "",
          "highlight": 1
        },
        "clue": "The 9 total parts are worth 5 each."
      },
      {
        "text": "The price per dozen of apples and mangoes is in the ratio 3:5. What is the ratio of price per fruit?",
        "options": [
          "3:5",
          "5:3",
          "1:12",
          "12:1"
        ],
        "answer": 0,
        "animation": {
          "type": "ratioScale",
          "title": "Per dozen → per fruit",
          "from": [3, 5],
          "to": [3, 5],
          "labels": ["apple", "mango"],
          "fromCaption": "per dozen — 3 : 5",
          "toCaption": "per fruit — 3 : 5",
          "arrowText": "÷ 12 each side",
          "stepText": "Dividing <strong>both</strong> prices by 12 leaves the ratio unchanged.",
          "answer": "Price per fruit ratio = 3 : 5"
        },
        "clue": "Dividing both dozen prices by 12 preserves the ratio."
      },
      {
        "text": "In a line of positions, A:C = 1:2. If A is at position 2, where is C?",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ],
        "answer": 1,
        "animation": {
          "type": "ratioScale",
          "title": "Scale A:C = 1:2 until A = 2",
          "from": [1, 2],
          "to": [2, 4],
          "factor": 2,
          "labels": ["A", "C"],
          "fromCaption": "1 : 2",
          "toCaption": "2 : 4",
          "answer": "C is at position 4"
        },
        "clue": "Double 2 to preserve 1:2."
      },
      {
        "text": "At what minute is 7:MM in the ratio 1:5?",
        "options": [
          "25",
          "30",
          "35",
          "40"
        ],
        "answer": 2,
        "animation": {
          "type": "ratioScale",
          "title": "Scale 1:5 until the first term is 7",
          "from": [1, 5],
          "to": [7, 35],
          "factor": 7,
          "labels": ["hour", "minute"],
          "fromCaption": "1 : 5",
          "toCaption": "7 : 35",
          "answer": "MM = 35"
        },
        "clue": "7:35 equals 1:5."
      },
      {
        "text": "If x:y = 2:5 and y:z = 5:8, what is x:z?",
        "options": [
          "2:8",
          "2:5",
          "5:8",
          "8:5"
        ],
        "answer": 0,
        "animation": {
          "type": "ratioChain",
          "title": "Chain x:y and y:z through the shared y",
          "parts": [
            { "label": "x", "value": 2, "tone": "pink" },
            { "label": "y", "value": 5, "tone": "orange" },
            { "label": "z", "value": 8, "tone": "indigo" }
          ],
          "phases": [
            { "highlight": [0, 1], "label": "x : y = 2 : 5" },
            { "highlight": [1, 2], "label": "y : z = 5 : 8" }
          ],
          "finalPhase": {
            "highlight": [0, 2],
            "label": "x : z = 2 : 8",
            "note": "Because y is <strong>5</strong> in both ratios, the chain links: x : y : z = <strong>2 : 5 : 8</strong>."
          },
          "answer": "x : z = 2 : 8"
        },
        "clue": "The shared y value is 5, so x:z is 2:8."
      }
    ]
  }
];
