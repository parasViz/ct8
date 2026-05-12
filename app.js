const modules = [
  {
    "id": "squares-cubes",
    "shortTitle": "Squares Cubes",
    "title": "A Square and a Cube",
    "skill": "perfect powers",
    "theme": "blue",
    "visual": "geometry",
    "intro": "Squares and cubes reveal number patterns, grid structures, and factor rules. The trick is to connect the visual model with the exponent form.",
    "lessons": [
      {
        "title": "Perfect Squares",
        "text": "A perfect square can be arranged as an n by n square."
      },
      {
        "title": "Perfect Cubes",
        "text": "A perfect cube can be arranged as an n by n by n block."
      },
      {
        "title": "Factor Completion",
        "text": "To make a product a perfect cube, every prime factor needs a multiple of three as its exponent."
      }
    ],
    "activity": {
      "title": "Power Builder",
      "prompt": "Break the number into factors, then rebuild it as a square or cube.",
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
        "text": "What is 2^5?",
        "options": [
          "10",
          "16",
          "25",
          "32"
        ],
        "answer": 3,
        "clue": "2 x 2 x 2 x 2 x 2."
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
        "clue": "Use 4 x 6."
      },
      {
        "text": "What is 3^5?",
        "options": [
          "81",
          "125",
          "243",
          "729"
        ],
        "answer": 2,
        "clue": "3 x 3 x 3 x 3 x 3."
      },
      {
        "text": "What is (2^3)^2?",
        "options": [
          "32",
          "48",
          "64",
          "128"
        ],
        "answer": 2,
        "clue": "2^3 is 8, and 8 squared is 64."
      },
      {
        "text": "Which is greatest?",
        "options": [
          "2^6",
          "3^4",
          "4^3",
          "5^2"
        ],
        "answer": 1,
        "clue": "The values are 64, 81, 64, and 25."
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
      "title": "Measure in Bases",
      "prompt": "Represent the same height using different pipe lengths and allowed digits.",
      "chips": [
        {
          "title": "66 decimal",
          "text": "66 uses six tens and six ones."
        },
        {
          "title": "66 binary",
          "text": "66 = 64 + 2."
        },
        {
          "title": "66 ternary",
          "text": "66 = 2 x 27 + 1 x 9 + 1 x 3."
        },
        {
          "title": "Base rule",
          "text": "Base n allows digits from 0 to n - 1."
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
        "text": "A quadrilateral has all sides equal and all angles equal to 90 degrees. What is it?",
        "options": [
          "kite",
          "square",
          "trapezium",
          "scalene triangle"
        ],
        "answer": 1,
        "clue": "Both equal sides and right angles are required."
      },
      {
        "text": "Which property is true for every parallelogram?",
        "options": [
          "one pair of adjacent sides is equal",
          "opposite sides are parallel",
          "all angles are 60 degrees",
          "it has five sides"
        ],
        "answer": 1,
        "clue": "The name tells you about parallel opposite sides."
      },
      {
        "text": "Which statement is true?",
        "options": [
          "Every rectangle is a parallelogram",
          "Every kite is a square",
          "Every trapezium is a circle",
          "Every rhombus has no parallel sides"
        ],
        "answer": 0,
        "clue": "A rectangle has two pairs of parallel sides."
      },
      {
        "text": "The diagonals of which shape always bisect each other?",
        "options": [
          "parallelogram",
          "random quadrilateral",
          "any kite",
          "any triangle"
        ],
        "answer": 0,
        "clue": "This is a standard parallelogram property."
      },
      {
        "text": "A trapezium has:",
        "options": [
          "no sides",
          "one pair of parallel sides",
          "all angles 30 degrees",
          "three diagonals"
        ],
        "answer": 1,
        "clue": "Use the school geometry definition used in the chapter."
      },
      {
        "text": "How many rectangles are in a 2 by 2 grid if squares are counted as rectangles?",
        "options": [
          "4",
          "5",
          "8",
          "9"
        ],
        "answer": 3,
        "clue": "Choose two vertical and two horizontal grid lines."
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
        "text": "A kite usually has:",
        "options": [
          "two pairs of adjacent equal sides",
          "four parallel sides",
          "no vertices",
          "only one side"
        ],
        "answer": 0,
        "clue": "Adjacent means next to each other."
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
        "text": "What is 6(3 + 4)?",
        "options": [
          "24",
          "36",
          "42",
          "54"
        ],
        "answer": 2,
        "clue": "6 x 7 = 42."
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
        "clue": "The shared y value is 5, so x:z is 2:8."
      }
    ]
  }
];

const moduleIds = new Set(modules.map((module) => module.id));
const STORAGE_KEY = "ct8-completed-modules";
const moduleNav = document.querySelector("#module-nav");
const moduleGrid = document.querySelector("#module-grid");
const completedCount = document.querySelector("#completed-count");
const moduleTotal = document.querySelector("#module-total");
const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menuToggle");

let currentModuleIndex = 0;
let quizIndex = 0;
let quizScore = 0;
let answered = false;
let completedModules = readCompleted();
let activeHintAnimation = null;

function lesson(title, text) {
  return { title, text };
}

function chip(title, text) {
  return { title, text };
}

function check(title, text) {
  return { title, text };
}

function q(text, options, answer, clue = "") {
  return { text, options, answer, clue };
}

function destroyPatternVisual() {
  if (activeHintAnimation) {
    activeHintAnimation.destroy();
    activeHintAnimation = null;
  }

  const host = document.querySelector("#pattern-visual");
  if (host) {
    host.innerHTML = "";
    host.hidden = true;
  }
}

function setQuestionClueContent(clue, content, mode = "") {
  if (!clue) {
    return;
  }

  clue.innerHTML = "";
  clue.classList.remove("stepped-hint", "hint-with-image");

  if (mode) {
    clue.dataset.mode = mode;
  } else {
    delete clue.dataset.mode;
  }

  const hasRichHint = content && typeof content === "object" && !Array.isArray(content);
  const steps = Array.isArray(content) ? content : hasRichHint ? content.steps : null;

  if (!steps && !hasRichHint) {
    clue.textContent = content;
    return;
  }

  clue.classList.add("stepped-hint");
  if (hasRichHint && content.image) {
    clue.classList.add("hint-with-image");
    const figure = document.createElement("figure");
    figure.className = "hint-image-frame";

    const image = document.createElement("img");
    image.src = content.image;
    image.alt = content.alt || "Hint image";
    image.loading = "lazy";

    figure.append(image);
    clue.append(figure);
  }

  if (!steps) {
    return;
  }

  steps.forEach((step, index) => {
    const row = document.createElement("span");
    row.className = "hint-step";

    const badge = document.createElement("span");
    badge.className = "hint-step-badge";
    badge.textContent = step.label || `Step ${index + 1}`;

    const text = document.createElement("span");
    text.className = "hint-step-text";
    text.textContent = step.text || step;

    row.append(badge, text);
    clue.append(row);
  });
}

function preparePatternHint(module, question) {
  destroyPatternVisual();

  const button = document.querySelector("#pattern-hint-button");
  if (!button) {
    return;
  }

  const hasTextHint = Boolean(question.hint);
  const hasVisualHint = module.id === "patterns" && question.visual;
  const hasAnimatedHint = Boolean(question.animation);
  const hasHint = hasTextHint || hasVisualHint || hasAnimatedHint;
  button.hidden = !hasHint;
  button.textContent = "Show hint";
  button.setAttribute("aria-expanded", "false");
  button.onclick = null;

  if (!hasHint) {
    return;
  }

  button.onclick = () => {
    const clue = document.querySelector("#question-clue");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      if (clue && clue.dataset.mode === "hint") {
        clue.classList.remove("show");
        setQuestionClueContent(clue, question.clue || "Think about the rule, then test each option.");
      }
      destroyPatternVisual();
      button.textContent = "Show hint";
      button.setAttribute("aria-expanded", "false");
      return;
    }

    if (hasTextHint && clue) {
      setQuestionClueContent(clue, question.hint, "hint");
      clue.classList.add("show");
    }
    if (hasAnimatedHint) {
      renderQuestionAnimation(question);
    }
    if (hasVisualHint) {
      renderQuestionVisual(module, question);
    }
    button.textContent = "Hide hint";
    button.setAttribute("aria-expanded", "true");
  };
}

function renderQuestionAnimation(question) {
  const host = document.querySelector("#pattern-visual");
  if (!host || !question.animation) {
    return;
  }

  destroyPatternVisual();
  host.hidden = false;
  host.innerHTML = patternPowerAnimationMarkup(question.animation);
  activeHintAnimation = createPatternPowerAnimation(host);
}

function renderQuestionVisual(module, question) {
  const host = document.querySelector("#pattern-visual");
  if (!host) {
    return;
  }

  destroyPatternVisual();

  if (module.id !== "patterns" || !question.visual) {
    return;
  }

  host.hidden = false;
  window.requestAnimationFrame(() => {
    if (host.hidden) {
      return;
    }
    createPatternSketch(host, question.visual);
  });
}

function createPatternSketch(host, visual) {
  host.innerHTML = patternHintMarkup(visual);
}

function patternPowerAnimationMarkup(animation) {
  return `
    <article class="power-hint-card" aria-label="Pattern Power animated hint">
      <header class="power-hint-head">
        <p>Module 1 Â· Pattern Power</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="power-hint-scene">
        <div class="power-step-label">loading...</div>
        <div class="power-eq-bar">
          <span class="power-eq-left"></span>
          <span class="power-eq-minus">âˆ’</span>
          <span class="power-eq-right"></span>
          <span class="power-eq-equals">=</span>
          <span class="power-eq-result"></span>
        </div>
        <div class="power-annotation"></div>
        <div class="power-grid-wrap">
          <div class="power-grid-container"></div>
        </div>
      </div>
      <div class="power-progress-track"><div class="power-progress-fill"></div></div>
      <div class="power-dots" aria-label="Animation steps"></div>
      <div class="power-controls">
        <button class="power-pause" type="button">pause</button>
        <button class="power-restart" type="button">restart</button>
      </div>
    </article>
  `;
}

function createPatternPowerAnimation(host) {
  const steps = [{ n: 2 }, { n: 3 }, { n: 4 }];
  const timings = {
    buildStagger: 60,
    waitAfterBuild: 2000,
    fadeInner: 800,
    glowDelay: 300,
    badgeDelay: 400,
    holdResult: 2500
  };
  const state = {
    paused: false,
    timers: [],
    stepIndex: 0
  };
  const find = (selector) => host.querySelector(selector);

  function schedule(fn, ms) {
    const id = window.setTimeout(() => {
      if (!state.paused) {
        fn();
      }
    }, ms);
    state.timers.push(id);
  }

  function clearAll() {
    state.timers.forEach((id) => window.clearTimeout(id));
    state.timers = [];
  }

  function renderDots(active, final = false) {
    const dots = find(".power-dots");
    if (!dots) {
      return;
    }
    dots.innerHTML = "";
    steps.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `power-dot${!final && index === active ? " active" : ""}`;
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to example ${index + 1}`);
      dot.addEventListener("click", () => jumpTo(index));
      dots.append(dot);
    });
    if (final) {
      const dot = document.createElement("span");
      dot.className = "power-dot active";
      dots.append(dot);
    }
  }

  function resetUI() {
    const minus = find(".power-eq-minus");
    const right = find(".power-eq-right");
    const equals = find(".power-eq-equals");
    const result = find(".power-eq-result");
    const left = find(".power-eq-left");
    const annotation = find(".power-annotation");
    const progress = find(".power-progress-fill");
    const gridWrap = find(".power-grid-wrap");

    [minus, right, equals, result].forEach((item) => {
      if (item) {
        item.style.opacity = "0";
      }
    });
    if (result) {
      result.style.transform = "scale(0.8)";
      result.style.color = "#16a34a";
    }
    if (left) {
      left.style.color = "#3b6fe0";
    }
    if (annotation) {
      annotation.style.opacity = "0";
    }
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
    }
    if (gridWrap) {
      gridWrap.style.display = "flex";
    }
  }

  function runStep(stepNumber) {
    state.stepIndex = stepNumber;
    clearAll();
    if (stepNumber >= steps.length) {
      showFinal();
      return;
    }

    const { n } = steps[stepNumber];
    const result = 2 * n - 1;
    resetUI();
    renderDots(stepNumber);

    find(".power-step-label").textContent = `Example ${stepNumber + 1} of ${steps.length}`;
    find(".power-eq-left").textContent = `${n}Â²`;
    find(".power-eq-right").textContent = `${n - 1}Â²`;
    find(".power-eq-result").textContent = result;

    const cellSize = n <= 3 ? 42 : 36;
    const gap = n <= 3 ? 5 : 4;
    const grid = find(".power-grid-container");
    grid.innerHTML = "";
    grid.style.setProperty("--gap", `${gap}px`);
    grid.style.gridTemplateColumns = `repeat(${n}, ${cellSize}px)`;

    const cells = [];
    for (let row = 0; row < n; row += 1) {
      for (let col = 0; col < n; col += 1) {
        const cell = document.createElement("div");
        cell.className = "power-cell";
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.animation = `powerCellPop .4s ease-out ${(row * n + col) * timings.buildStagger}ms forwards`;
        grid.append(cell);
        cells.push({ el: cell, row, col });
      }
    }

    const buildDone = n * n * timings.buildStagger + 400;
    schedule(() => {
      find(".power-eq-minus").style.opacity = "1";
      find(".power-eq-right").style.opacity = "1";
    }, buildDone + timings.waitAfterBuild - 200);

    schedule(() => {
      cells.forEach(({ el, row, col }) => {
        if (row < n - 1 && col < n - 1) {
          el.style.transition = `opacity ${timings.fadeInner}ms ease, transform ${timings.fadeInner}ms ease, background ${timings.fadeInner}ms ease`;
          el.style.opacity = "0.07";
          el.style.transform = "scale(0.82)";
          el.style.background = "#e2e8f0";
        }
      });
    }, buildDone + timings.waitAfterBuild);

    schedule(() => {
      cells.forEach(({ el, row, col }) => {
        if (!(row < n - 1 && col < n - 1)) {
          el.style.animation = "none";
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
          el.style.background = "#16a34a";
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              el.style.animation = "powerLGlow 1.4s ease-in-out infinite";
            });
          });
        }
      });

      find(".power-eq-left").style.color = "#16a34a";
      find(".power-eq-equals").style.opacity = "1";
      const eqResult = find(".power-eq-result");
      eqResult.style.opacity = "1";
      eqResult.style.transform = "scale(1)";
    }, buildDone + timings.waitAfterBuild + timings.fadeInner + timings.glowDelay);

    const resultAt = buildDone + timings.waitAfterBuild + timings.fadeInner + timings.glowDelay + timings.badgeDelay + 300;

    schedule(() => {
      const progress = find(".power-progress-fill");
      progress.style.transition = `width ${timings.holdResult}ms linear`;
      progress.style.width = "100%";
    }, resultAt);

    schedule(() => runStep(stepNumber + 1), resultAt + timings.holdResult);
  }

  function showFinal() {
    clearAll();
    resetUI();
    renderDots(steps.length, true);
    find(".power-step-label").textContent = "Your turn";
    find(".power-grid-container").innerHTML = "";
    find(".power-grid-wrap").style.display = "none";
    find(".power-eq-left").textContent = "50Â²";
    find(".power-eq-right").textContent = "49Â²";
    const result = find(".power-eq-result");
    result.textContent = "?";
    result.style.color = "#ea580c";

    schedule(() => {
      find(".power-eq-minus").style.opacity = "1";
      find(".power-eq-right").style.opacity = "1";
    }, 400);

    schedule(() => {
      find(".power-eq-equals").style.opacity = "1";
      result.style.opacity = "1";
      result.style.transform = "scale(1)";
    }, 1000);

    schedule(() => {
      const progress = find(".power-progress-fill");
      progress.style.transition = "width 5s linear";
      progress.style.width = "100%";
    }, 1800);

    schedule(restart, 6800);
  }

  function togglePause() {
    state.paused = !state.paused;
    find(".power-pause").textContent = state.paused ? "play" : "pause";
    if (!state.paused) {
      runStep(state.stepIndex);
    }
  }

  function restart() {
    clearAll();
    state.paused = false;
    find(".power-pause").textContent = "pause";
    runStep(0);
  }

  function jumpTo(index) {
    clearAll();
    state.paused = false;
    find(".power-pause").textContent = "pause";
    runStep(index);
  }

  find(".power-pause").addEventListener("click", togglePause);
  find(".power-restart").addEventListener("click", restart);
  restart();

  return {
    destroy: clearAll
  };
}

function patternHintMarkup(visual) {
  return `
    <article class="hint-card hint-${visual.type}">
      <header class="hint-card-header">
        <span>Hint</span>
        <h4>${visual.title}</h4>
      </header>
      <div class="hint-card-body">
        ${patternHintBody(visual)}
      </div>
      <footer class="hint-takeaway">
        <strong>Try this:</strong>
        <span>${visual.hint}</span>
      </footer>
    </article>
  `;
}

function patternHintBody(visual) {
  switch (visual.type) {
    case "differences":
      return sequenceHint(visual.values, visual.diffs, "Look at the gap between each pair.");
    case "wrongDiff":
      return sequenceHint(visual.values, visual.diffs, "One jump does not fit the expected gap pattern.", visual.expected);
    case "doubling":
      return pairHint(visual.pairs, "x2", "Letters move forward. Numbers double.");
    case "alphabet":
      return sequenceHint(visual.letters, visual.jumps, "Use alphabet positions and compare jumps.");
    case "split":
      return splitHint(visual);
    case "table":
      return tableHint(visual);
    case "stacks":
      return stackHint(visual);
    case "linear":
      return linearHint(visual);
    case "cycle":
      return cycleHint(visual);
    case "stair":
      return stairHint(visual);
    default:
      return "";
  }
}

function sequenceHint(items, gaps, label, expected = []) {
  const showEquation =
    items[items.length - 1] === "?" &&
    isNumericValue(items[items.length - 2]) &&
    /^[+-]\d+$/.test(String(gaps[gaps.length - 1]));

  return `
    <p class="hint-focus"><span>Step 1</span><strong>${label}</strong></p>
    <div class="hint-scroll" aria-hidden="true">
      <div class="hint-sequence">
        ${items
          .map((item, index) => {
            const hasGap = index < gaps.length;
            const isTarget = item === "?";
            const isMismatch = expected[index] && expected[index] !== gaps[index];
            return `
              <div class="hint-sequence-item">
                <div class="hint-tile ${isTarget ? "target" : ""}">${item}</div>
                ${
                  hasGap
                    ? `<div class="hint-gap ${isMismatch ? "mismatch" : ""}">
                        <span>${gaps[index]}</span>
                        <b>${isMismatch ? "check" : "gap"}</b>
                      </div>`
                    : ""
                }
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
    ${ruleRow(expected.length ? "Actual gaps" : "Gap pattern", gaps, expected)}
    ${expected.length ? ruleRow("Expected gaps", expected) : ""}
    ${
      showEquation
        ? `<div class="hint-equation"><span>Step 2</span><strong>${items[items.length - 2]} ${formatGapForEquation(gaps[gaps.length - 1])} = ?</strong></div>`
        : ""
    }
  `;
}

function pairHint(pairs, rule, label) {
  return `
    <p class="hint-focus"><span>Step 1</span><strong>${label}</strong></p>
    <div class="hint-scroll" aria-hidden="true">
      <div class="hint-sequence pair-sequence">
        ${pairs
          .map(
            (pair, index) => `
            <div class="hint-sequence-item">
              <div class="hint-pair ${pair[1] === "?" ? "target" : ""}">
                <strong>${pair[0]}</strong>
                <span>${pair[1]}</span>
              </div>
              ${index < pairs.length - 1 ? `<div class="hint-gap"><span>${rule}</span><b>number</b></div>` : ""}
            </div>
          `
          )
          .join("")}
      </div>
    </div>
    <div class="hint-equation"><span>Step 2</span><strong>${pairs.map((pair) => pair[1]).join(" -> ")}</strong></div>
  `;
}

function splitHint(visual) {
  return `
    <p class="hint-focus"><span>Step 1</span><strong>Separate odd-position terms and even-position terms.</strong></p>
    <div class="lane-board">
      ${laneMarkup(visual.topLabel, visual.top, visual.topRule)}
      ${laneMarkup(visual.bottomLabel, visual.bottom, visual.bottomRule, true)}
    </div>
  `;
}

function laneMarkup(label, items, rule, accent = false) {
  return `
    <div class="hint-lane ${accent ? "accent" : ""}">
      <span>${label}</span>
      <div>
        ${items.map((item) => `<b class="${item === "?" ? "target" : ""}">${item}</b>`).join(`<em>${rule}</em>`)}
      </div>
    </div>
  `;
}

function tableHint(visual) {
  return `
    <p class="hint-focus"><span>Step 1</span><strong>Fill the last row using the same rule as the first rows.</strong></p>
    <table class="hint-table">
      <thead><tr>${visual.columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead>
      <tbody>
        ${visual.rows
          .map((row) => `<tr>${row.map((cell) => `<td class="${cell === "?" ? "target" : ""}">${cell}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function stackHint(visual) {
  return `
    <p class="hint-focus"><span>Step 1</span><strong>The number of copies increases by one each time.</strong></p>
    <div class="stack-hint">
      ${visual.stacks
        .map((stack) => {
          const isTarget = Boolean(stack.target);
          return `
          <div class="${stack.target ? "target" : ""}">
            <div class="stack-dots">${isTarget ? "<i class=\"mystery-dot\">?</i>" : Array.from({ length: stack.count }, () => "<i></i>").join("")}</div>
            <strong>${stack.label}</strong>
            <span>${isTarget ? "? copies" : `${stack.count} copies`}</span>
          </div>
        `;
        })
        .join("")}
    </div>
  `;
}

function linearHint(visual) {
  return `
    <p class="hint-focus"><span>Step 1</span><strong>Every new term adds 3 chairs. Count how many jumps are needed.</strong></p>
    <div class="linear-hint">
      ${visual.terms
        .map(
          ([term, value]) => `
          <div class="${value === "?" ? "target" : ""}">
            <span>Term ${term}</span>
            <strong>${value}</strong>
          </div>
        `
        )
        .join("")}
    </div>
    <div class="hint-equation"><span>Step 2</span><strong>4 + 14 jumps of 3 = ?</strong></div>
  `;
}

function cycleHint(visual) {
  const colors = { red: "#f95877", blue: "#118ab2", green: "#06d6a0", yellow: "#ffd166" };
  return `
    <p class="hint-focus"><span>Step 1</span><strong>One full cycle has 4 colours. Count complete cycles, then the leftover spot.</strong></p>
    <div class="cycle-key">
      ${visual.colors.map((color, index) => `<span style="--dot:${colors[color]}"><b>${index + 1}</b>${color}</span>`).join("")}
    </div>
    <div class="cycle-hint">
      ${Array.from({ length: visual.target }, (_, index) => {
        const number = index + 1;
        const colorName = visual.colors[index % visual.colors.length];
        const isTarget = number === visual.target;
        return `<span class="${isTarget ? "target mystery-cycle" : ""}" style="--dot:${isTarget ? "#f95877" : colors[colorName]}">${number}</span>`;
      }).join("")}
    </div>
  `;
}

function stairHint(visual) {
  return `
    <p class="hint-focus"><span>Step 1</span><strong>Each row has one more block than the row above it.</strong></p>
    <div class="stair-hint">
      ${Array.from({ length: visual.rows }, (_, rowIndex) => {
        const blocks = rowIndex + 1;
        return `<div>${Array.from({ length: blocks }, () => "<span></span>").join("")}<b>${blocks}</b></div>`;
      }).join("")}
    </div>
    <div class="hint-equation"><span>Step 2</span><strong>1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = ?</strong></div>
  `;
}

function ruleRow(label, values, expected = []) {
  return `
    <div class="hint-rule-row">
      <span>${label}</span>
      ${values
        .map((value, index) => `<b class="${expected[index] && expected[index] !== value ? "mismatch" : ""}">${value}</b>`)
        .join("")}
    </div>
  `;
}

function isNumericValue(value) {
  return /^-?\d+$/.test(String(value));
}

function formatGapForEquation(gap) {
  return String(gap).replace("+", "+ ").replace("-", "- ");
}

function drawPatternVisual(ctx, visual, width, height, frame = 0) {
  ctx.clearRect(0, 0, width, height);
  drawRoundedRect(ctx, 0, 0, width, height, 8, "#ffffff", "rgba(23, 32, 52, 0.1)");
  drawRoundedRect(ctx, 14, 14, width - 28, 40, 8, "#f5f9ff", "rgba(17, 138, 178, 0.16)");
  drawLabel(ctx, "Visual hint", 28, 39, 12, "#118ab2", 900);
  drawLabel(ctx, visual.title, 112, 40, 16, "#172034", 900);
  ctx.__noteY = height - 30;
  ctx.__noteWidth = width - 64;

  switch (visual.type) {
    case "differences":
      drawDifferenceVisual(ctx, visual, width, frame);
      break;
    case "stacks":
      drawStackVisual(ctx, visual, width, frame);
      break;
    case "doubling":
      drawDoublingVisual(ctx, visual, width, frame);
      break;
    case "split":
      drawSplitVisual(ctx, visual, width, frame);
      break;
    case "table":
      drawTableVisual(ctx, visual, width, frame);
      break;
    case "wrongDiff":
      drawWrongDifferenceVisual(ctx, visual, width);
      break;
    case "linear":
      drawLinearVisual(ctx, visual, width, frame);
      break;
    case "cycle":
      drawCycleVisual(ctx, visual, width, frame);
      break;
    case "stair":
      drawStairVisual(ctx, visual, width);
      break;
    case "alphabet":
      drawAlphabetVisual(ctx, visual, width, frame);
      break;
  }
}

function drawDifferenceVisual(ctx, visual, width, frame) {
  const cards = layoutCards(width, visual.values.length, 62, 18, 34);
  visual.values.forEach((value, index) => {
    drawCard(ctx, { ...cards[index], h: 54 }, 86, String(value), index === visual.values.length - 1, frame);
    if (index < visual.diffs.length) {
      drawArrow(ctx, cards[index].x + cards[index].w + 4, 113, cards[index + 1].x - 4, 113, "", index === visual.diffs.length - 1, frame);
      const chipX = (cards[index].x + cards[index].w + cards[index + 1].x) / 2;
      drawGapChip(ctx, chipX, 158, visual.diffs[index], index === visual.diffs.length - 1, frame);
    }
  });
  drawLabel(ctx, "Numbers", 34, 78, 12, "#647086", 900);
  drawLabel(ctx, "Gaps", 34, 164, 12, "#647086", 900);
  drawNote(ctx, "The gaps grow by 3 each time: +3, +6, +9, +12, then +15.");
}

function drawStackVisual(ctx, visual, width, frame) {
  const cards = layoutCards(width, visual.stacks.length, 70, 24);
  visual.stacks.forEach((stack, index) => {
    const x = cards[index].x + cards[index].w / 2;
    const pulse = stack.target ? 1 + Math.sin(frame / 18) * 0.08 : 1;
    for (let dot = 0; dot < stack.count; dot += 1) {
      drawCircle(ctx, x, 150 - dot * 18, 7 * pulse, stack.target ? "#f95877" : "#06d6a0");
    }
    drawCard(ctx, { x: cards[index].x, y: 166, w: cards[index].w, h: 42 }, stack.label, stack.target, frame);
    drawLabel(ctx, `${stack.count} copies`, cards[index].x + cards[index].w / 2, 218, 12, "#506070", 800, "center");
  });
}

function drawDoublingVisual(ctx, visual, width, frame) {
  const cards = layoutCards(width, visual.pairs.length, 64, 22);
  visual.pairs.forEach((pair, index) => {
    drawCard(ctx, { x: cards[index].x, y: 76, w: cards[index].w, h: 92 }, `${pair[0]}\n${pair[1]}`, index === visual.pairs.length - 1, frame);
    if (index < visual.pairs.length - 1) {
      drawArrow(ctx, cards[index].x + cards[index].w, 122, cards[index + 1].x, 122, "x2", false, frame);
    }
  });
  drawNote(ctx, "Letters move one step; numbers double.", 18, 210);
}

function drawSplitVisual(ctx, visual, width, frame) {
  drawLane(ctx, visual.topLabel, visual.top, 64, visual.topRule, width, "#118ab2", frame);
  drawLane(ctx, visual.bottomLabel, visual.bottom, 145, visual.bottomRule, width, "#f95877", frame);
}

function drawTableVisual(ctx, visual, width, frame) {
  const tableWidth = Math.min(width - 36, 560);
  const startX = (width - tableWidth) / 2;
  const rowH = 32;
  const colW = tableWidth / visual.columns.length;
  const startY = 58;

  visual.columns.forEach((column, index) => {
    drawRoundedRect(ctx, startX + index * colW, startY, colW - 3, rowH, 8, "#172034");
    drawLabel(ctx, column, startX + index * colW + colW / 2, startY + 21, 12, "white", 900, "center");
  });

  visual.rows.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const target = rowIndex === visual.rows.length - 1;
      drawRoundedRect(ctx, startX + colIndex * colW, startY + 38 + rowIndex * rowH, colW - 3, rowH - 3, 8, target ? pulseColor(frame) : "white", "rgba(23, 32, 52, 0.08)");
      drawLabel(ctx, cell, startX + colIndex * colW + colW / 2, startY + 59 + rowIndex * rowH, 14, "#172034", 900, "center");
    });
  });
  drawNote(ctx, "Total = black squares + white squares.", 18, 218);
}

function drawWrongDifferenceVisual(ctx, visual, width) {
  const cards = layoutCards(width, visual.values.length, 46, 14);
  visual.values.forEach((value, index) => {
    drawCard(ctx, cards[index], 88, String(value), false, 0);
    if (index < visual.diffs.length) {
      const mismatch = visual.diffs[index] !== visual.expected[index];
      drawArrow(ctx, cards[index].x + cards[index].w + 1, 120, cards[index + 1].x - 1, 120, visual.diffs[index], mismatch, 0);
      if (mismatch) {
        drawLabel(ctx, "check", (cards[index].x + cards[index + 1].x + cards[index].w) / 2, 150, 11, "#f95877", 900, "center");
      }
    }
  });
  drawNote(ctx, "Expected gaps: +2, +4, +6, +8, +10, +12.", 18, 210);
}

function drawLinearVisual(ctx, visual, width, frame) {
  const cards = layoutCards(width, visual.terms.length, 74, 18);
  visual.terms.forEach((term, index) => {
    drawRoundedRect(ctx, cards[index].x, 78, cards[index].w, 82, 14, index === visual.terms.length - 1 ? pulseColor(frame) : "white", "rgba(23, 32, 52, 0.08)");
    drawLabel(ctx, `Term ${term[0]}`, cards[index].x + cards[index].w / 2, 104, 12, "#506070", 900, "center");
    drawLabel(ctx, term[1], cards[index].x + cards[index].w / 2, 140, 24, "#172034", 900, "center");
    if (index < visual.terms.length - 2) {
      drawArrow(ctx, cards[index].x + cards[index].w + 2, 119, cards[index + 1].x - 2, 119, "+3", false, frame);
    }
  });
  drawNote(ctx, "From term 1 to term 15, there are 14 jumps of +3.", 18, 214);
}

function drawCycleVisual(ctx, visual, width, frame) {
  const colors = { red: "#f95877", blue: "#118ab2", green: "#06d6a0", yellow: "#ffd166" };
  const startX = 28;
  const gap = Math.min(34, (width - 56) / 10);
  for (let index = 1; index <= visual.target; index += 1) {
    const row = index > 9 ? 1 : 0;
    const col = (index - 1) % 9;
    const colourName = visual.colors[(index - 1) % visual.colors.length];
    const x = startX + col * gap;
    const y = 76 + row * 70;
    const target = index === visual.target;
    drawCircle(ctx, x, y, target ? 15 + Math.sin(frame / 16) * 2 : 13, colors[colourName], target ? "#172034" : "white");
    drawLabel(ctx, String(index), x, y + 36, 11, "#506070", 800, "center");
  }
  drawNote(ctx, "Count in groups of 4: red, blue, green, yellow.", 18, 214);
}

function drawStairVisual(ctx, visual, width) {
  const size = Math.min(20, (width - 80) / visual.rows);
  const baseX = Math.max(22, width / 2 - (visual.rows * size) / 2);
  const baseY = 184;
  let total = 0;
  for (let row = 1; row <= visual.rows; row += 1) {
    total += row;
    for (let col = 0; col < row; col += 1) {
      drawRoundedRect(ctx, baseX + col * size, baseY - row * size, size - 2, size - 2, 4, row % 2 ? "#06d6a0" : "#118ab2");
    }
    drawLabel(ctx, String(row), baseX - 16, baseY - row * size + size / 2 + 4, 11, "#506070", 800, "center");
  }
  drawNote(ctx, `Rows 1 to 8 make ${total} blocks in all.`, 18, 218);
}

function drawAlphabetVisual(ctx, visual, width, frame) {
  const cards = layoutCards(width, visual.letters.length, 52, 18);
  visual.letters.forEach((letter, index) => {
    drawCard(ctx, cards[index], 88, letter, index === visual.letters.length - 1, frame);
    if (index < visual.jumps.length) {
      drawArrow(ctx, cards[index].x + cards[index].w + 3, 120, cards[index + 1].x - 3, 120, visual.jumps[index], index === visual.jumps.length - 1, frame);
    }
  });
  drawNote(ctx, "Use alphabet positions: A=1, C=3, F=6, J=10, O=15.", 18, 210);
}

function drawLane(ctx, label, items, y, rule, width, colour, frame) {
  drawLabel(ctx, label, 18, y + 6, 12, "#506070", 900);
  const cards = layoutCards(width - 104, items.length, 52, 18, 104);
  items.forEach((item, index) => {
    drawCard(ctx, { x: cards[index].x, y: y + 22, w: cards[index].w, h: 46 }, item, item === "?", frame);
    if (index < items.length - 1) {
      drawArrow(ctx, cards[index].x + cards[index].w + 4, y + 45, cards[index + 1].x - 4, y + 45, rule, item === "?", frame, colour);
    }
  });
}

function layoutCards(width, count, cardWidth, gap, offset = 18) {
  const available = width - offset * 2;
  const actualGap = count > 1 ? Math.min(gap, Math.max(8, (available - count * cardWidth) / (count - 1))) : 0;
  const actualWidth = Math.min(cardWidth, (available - actualGap * (count - 1)) / count);
  const total = count * actualWidth + (count - 1) * actualGap;
  const start = offset + (available - total) / 2;
  return Array.from({ length: count }, (_, index) => ({ x: start + index * (actualWidth + actualGap), y: 0, w: actualWidth, h: 52 }));
}

function drawCard(ctx, rect, yOrText, maybeText, maybeHighlight, frame = 0) {
  const rectWithY = typeof yOrText === "number" ? { ...rect, y: yOrText } : rect;
  const text = typeof yOrText === "number" ? maybeText : yOrText;
  const highlight = typeof yOrText === "number" ? maybeHighlight : maybeText;
  const fill = highlight ? pulseColor(frame) : "white";
  drawRoundedRect(ctx, rectWithY.x, rectWithY.y, rectWithY.w, rectWithY.h, 10, fill, "rgba(23, 32, 52, 0.12)");
  String(text)
    .split("\n")
    .forEach((line, index, lines) => {
      const y = rectWithY.y + rectWithY.h / 2 + (index - (lines.length - 1) / 2) * 24 + 8;
      drawLabel(ctx, line, rectWithY.x + rectWithY.w / 2, y, lines.length > 1 ? 20 : 23, "#172034", 900, "center");
    });
}

function drawArrow(ctx, x1, y1, x2, y2, label, highlight = false, frame = 0, colour = "#118ab2") {
  const stroke = highlight ? "#f95877" : colour;
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = stroke;
  ctx.lineWidth = highlight ? 3 : 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 7, y2 - 5);
  ctx.lineTo(x2 - 7, y2 + 5);
  ctx.closePath();
  ctx.fill();
  if (label) {
    const midX = (x1 + x2) / 2;
    drawRoundedRect(ctx, midX - 18, y1 - 25, 36, 20, 10, highlight ? pulseColor(frame) : "#eff7ff");
    drawLabel(ctx, label, midX, y1 - 10, 11, stroke, 900, "center");
  }
  ctx.restore();
}

function drawGapChip(ctx, x, y, label, highlight = false, frame = 0) {
  const fill = highlight ? pulseColor(frame) : "#eef7ff";
  const color = highlight ? "#f95877" : "#118ab2";
  drawRoundedRect(ctx, x - 21, y - 15, 42, 28, 14, fill, highlight ? "rgba(249, 88, 119, 0.24)" : "rgba(17, 138, 178, 0.16)");
  drawLabel(ctx, label, x, y + 5, 13, color, 900, "center");
}

function drawNote(ctx, text) {
  const x = 18;
  const y = ctx.__noteY || 226;
  const maxWidth = ctx.__noteWidth || 390;
  drawRoundedRect(ctx, 14, y - 24, maxWidth + 28, 38, 8, "#f8fafc", "rgba(23, 32, 52, 0.08)");
  const words = text.split(" ");
  let line = "";
  let lineY = y;
  ctx.save();
  ctx.font = "800 12px Inter, Arial, sans-serif";
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      drawLabel(ctx, line, x, lineY, 12, "#506070", 800);
      line = word;
      lineY += 16;
    } else {
      line = testLine;
    }
  });
  if (line) {
    drawLabel(ctx, line, x, lineY, 12, "#506070", 800);
  }
  ctx.restore();
}

function drawLabel(ctx, text, x, y, size, color, weight = 700, align = "left") {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px Inter, Arial, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawCircle(ctx, x, y, radius, fill, stroke = "white") {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = stroke;
  ctx.stroke();
  ctx.restore();
}

function drawRoundedRect(ctx, x, y, width, height, radius, fill, stroke = "") {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  ctx.restore();
}

function pulseColor(frame) {
  const opacity = 0.22 + Math.sin(frame / 18) * 0.08;
  return `rgba(249, 88, 119, ${opacity})`;
}

function readCompleted() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? new Set(JSON.parse(value).filter((id) => moduleIds.has(id))) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedModules]));
}

function showSection(sectionId) {
  if (sectionId !== "section-quiz") {
    destroyPatternVisual();
  }

  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveNav(target) {
  document.querySelectorAll(".nav-item").forEach((button) => {
    const isActive = button.dataset.navTarget === target;
    button.classList.toggle("active", isActive);
  });
}

function closeSidebarOnMobile() {
  if (window.matchMedia("(max-width: 760px)").matches) {
    sidebar.classList.remove("open");
  }
}

function renderNav() {
  moduleNav.innerHTML = "";

  const welcomeButton = document.createElement("button");
  welcomeButton.className = "nav-item active";
  welcomeButton.type = "button";
  welcomeButton.dataset.navTarget = "welcome";
  welcomeButton.textContent = "Introduction";
  welcomeButton.addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
    closeSidebarOnMobile();
  });
  moduleNav.appendChild(welcomeButton);

  modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "nav-item";
    button.type = "button";
    button.dataset.navTarget = String(index);
    button.textContent = `${index + 1} - ${module.shortTitle}`;
    button.addEventListener("click", () => {
      openModule(index);
      closeSidebarOnMobile();
    });
    moduleNav.appendChild(button);
  });

  updateCompletedView();
}

function renderModuleGrid() {
  moduleGrid.innerHTML = "";
  modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "module-card";
    button.type = "button";
    button.dataset.theme = module.theme;
    button.innerHTML = `
      <p class="eyebrow">Module ${index + 1}</p>
      <h3>${module.title}</h3>
      <p>${module.intro}</p>
      <div class="module-meta">
        <span>${module.skill}</span>
        <span>${module.quiz.length} questions</span>
      </div>
    `;
    button.addEventListener("click", () => openModule(index));
    moduleGrid.appendChild(button);
  });
}

function updateCompletedView() {
  completedCount.textContent = completedModules.size;
  if (moduleTotal) {
    moduleTotal.textContent = modules.length;
  }
  document.querySelectorAll(".nav-item[data-nav-target]").forEach((button) => {
    const module = modules[Number(button.dataset.navTarget)];
    if (module) {
      button.classList.toggle("completed", completedModules.has(module.id));
    }
  });
}

function openModule(index) {
  currentModuleIndex = index;
  renderModule(index);
  showSection("section-module");
  setActiveNav(String(index));
}

function renderModule(index) {
  const module = modules[index];
  document.querySelector("#module-kicker").textContent = `Module ${index + 1} - ${module.skill}`;
  document.querySelector("#module-title").textContent = module.title;

  const body = document.querySelector("#module-body");
  body.innerHTML = `
    <div class="story-card">
      <div class="story-text">
        <p class="story-highlight">Learn</p>
        <p>${module.intro}</p>
      </div>
    </div>

    ${
      module.video
        ? `
        <div class="story-card video-card">
          <div class="story-text">
            <p class="story-highlight">Video</p>
            <h3>${module.video.title}</h3>
          </div>
          <div class="video-frame">
            <iframe
              width="1177"
              height="662"
              src="${module.video.embed}"
              title="Number Systerm  | AAW"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <a class="video-link" href="${module.video.url}" target="_blank" rel="noopener noreferrer">Open video on YouTube</a>
        </div>
      `
        : ""
    }

    <div class="lesson-grid">
      ${module.lessons
        .map(
          (item, lessonIndex) => `
          <article class="lesson-card">
            <span class="lesson-badge">Idea ${lessonIndex + 1}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
        )
        .join("")}
    </div>

    <div class="story-card activity-lab">
      <div class="activity-visual visual-${module.visual}" aria-hidden="true"></div>
      <div class="activity-card">
        <p class="story-highlight">Try this</p>
        <h3>${module.activity.title}</h3>
        <p>${module.activity.prompt}</p>
        <div class="activity-chips">
          ${module.activity.chips
            .map((item, chipIndex) => `<button class="activity-chip" type="button" data-chip="${chipIndex}">${item.title}</button>`)
            .join("")}
        </div>
        <div id="activity-detail" class="activity-detail"></div>
      </div>
    </div>

    <div class="story-card">
      <div class="story-text">
        <p class="story-highlight">Remember</p>
      </div>
      <div class="mini-checks">
        ${module.checks
          .map(
            (item) => `
            <div class="mini-check">
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;

  bindActivityChips(module);

  const previousButton = document.querySelector("#previous-module");
  const nextButton = document.querySelector("#next-module");
  previousButton.disabled = index === 0;
  nextButton.disabled = index === modules.length - 1;
}

function bindActivityChips(module) {
  const chips = document.querySelectorAll(".activity-chip");
  const detail = document.querySelector("#activity-detail");

  function activate(chipIndex) {
    const item = module.activity.chips[chipIndex];
    detail.textContent = item.text;
    chips.forEach((chipButton) => {
      chipButton.classList.toggle("active", Number(chipButton.dataset.chip) === chipIndex);
    });
  }

  chips.forEach((chipButton) => {
    chipButton.addEventListener("click", () => activate(Number(chipButton.dataset.chip)));
  });

  activate(0);
}

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  answered = false;
  renderQuestion();
  showSection("section-quiz");
  setActiveNav(String(currentModuleIndex));
}

function renderQuestion() {
  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];
  answered = false;

  document.querySelector("#quiz-module-kicker").textContent = `Module ${currentModuleIndex + 1}`;
  document.querySelector("#quiz-title").textContent = module.title;
  document.querySelector("#quiz-score").textContent = quizScore;
  document.querySelector("#question-count").textContent = `Question ${quizIndex + 1} of ${module.quiz.length}`;
  renderQuestionText(question);
  document.querySelector("#feedback").textContent = "";
  document.querySelector("#feedback").className = "feedback";
  document.querySelector("#next-question").disabled = true;

  const clue = document.querySelector("#question-clue");
  setQuestionClueContent(clue, question.clue || "Think about the rule, then test each option.");
  clue.classList.remove("show");
  preparePatternHint(module, question);

  const progress = ((quizIndex + 1) / module.quiz.length) * 100;
  document.querySelector("#progress-bar").style.width = `${progress}%`;

  const answerOptions = document.querySelector("#answer-options");
  answerOptions.innerHTML = "";
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";

    const optionLetter = document.createElement("span");
    optionLetter.className = "option-letter";
    optionLetter.textContent = String.fromCharCode(65 + optionIndex);

    const optionText = document.createElement("span");
    optionText.className = "option-text";
    optionText.textContent = option;

    button.append(optionLetter, optionText);
    button.addEventListener("click", () => chooseAnswer(optionIndex));
    answerOptions.appendChild(button);
  });
}

function renderQuestionText(question) {
  const questionText = document.querySelector("#question-text");
  questionText.innerHTML = "";
  questionText.className = question.format
    ? `formatted-question ${question.format.type ? `${question.format.type}-question` : ""}`.trim()
    : "";

  if (!question.format) {
    questionText.textContent = question.text;
    return;
  }

  if (question.format.type === "gridChallenge") {
    renderGridChallengeQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "cubeCompletion") {
    renderCubeCompletionQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "gaussSum") {
    renderGaussSumQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "columnRules") {
    renderColumnRulesQuestion(questionText, question.format);
    return;
  }

  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = question.format.title;

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = question.format.intro;

  const mathBlock = document.createElement("span");
  mathBlock.className = "question-math-block";
  question.format.equations.forEach((equation) => {
    const line = document.createElement("span");
    line.textContent = equation;
    mathBlock.append(line);
  });

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = question.format.ask;

  questionText.append(title, intro, mathBlock, ask);
}

function renderColumnRulesQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = format.intro;

  const tableWrap = document.createElement("span");
  tableWrap.className = "column-table-wrap";

  const table = document.createElement("table");
  table.className = "column-rules-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  format.headers.forEach((header) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = header;
    headRow.append(th);
  });
  thead.append(headRow);

  const tbody = document.createElement("tbody");
  format.rows.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      if (cell === "?") {
        td.className = "unknown-cell";
      }
      tr.append(td);
    });
    tbody.append(tr);
  });

  table.append(thead, tbody);
  tableWrap.append(table);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  questionText.append(title, intro, tableWrap, ask);
}

function renderGaussSumQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const story = document.createElement("span");
  story.className = "gauss-story";
  format.story.forEach((paragraph) => {
    const line = document.createElement("span");
    line.textContent = paragraph;
    story.append(line);
  });

  const work = document.createElement("span");
  work.className = "gauss-work";

  const sumLine = document.createElement("span");
  sumLine.className = "gauss-sum-line";
  sumLine.textContent = format.equation;

  work.append(sumLine);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  questionText.append(title, story, work, ask);
}

function renderCubeCompletionQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = format.intro;

  const examples = document.createElement("span");
  examples.className = "cube-example-row";
  format.examples.forEach((example) => {
    const exampleLine = createFactorExpression(example.value, example.factors, "cube-example");
    examples.append(exampleLine);
  });

  const work = document.createElement("span");
  work.className = "cube-work-panel";

  const givenLabel = document.createElement("span");
  givenLabel.className = "cube-work-label";
  givenLabel.textContent = format.given.label;

  const givenLine = createFactorExpression(format.given.value, format.given.factors, "cube-given", {
    markLast: true
  });

  const targetLine = document.createElement("span");
  targetLine.className = "cube-target-equation";
  const [start, multiplier, ...cubeFactors] = format.target;
  addMathToken(targetLine, start);
  addMathOperator(targetLine, "x");
  addMathToken(targetLine, multiplier, "cube-unknown");
  addMathOperator(targetLine, "=");
  cubeFactors.forEach((factor, index) => {
    addMathToken(targetLine, factor);
    if (index < cubeFactors.length - 1) {
      addMathOperator(targetLine, "x");
    }
  });

  work.append(givenLabel, givenLine, targetLine);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  questionText.append(title, intro, examples, work, ask);
}

function createFactorExpression(value, factors, className, options = {}) {
  const line = document.createElement("span");
  line.className = className;
  addMathToken(line, value, "cube-value");
  addMathOperator(line, "=");
  factors.forEach((factor, index) => {
    addMathToken(line, factor, options.markLast && index === factors.length - 1 ? "cube-loose-factor" : "");
    if (index < factors.length - 1) {
      addMathOperator(line, "x");
    }
  });
  return line;
}

function addMathToken(parent, text, className = "") {
  const token = document.createElement("span");
  token.className = `cube-math-token ${className}`.trim();
  token.textContent = text;
  parent.append(token);
}

function addMathOperator(parent, text) {
  const operator = document.createElement("span");
  operator.className = "cube-math-operator";
  operator.textContent = text;
  parent.append(operator);
}

function renderGridChallengeQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const layout = document.createElement("span");
  layout.className = "grid-question-layout";

  const entryPanel = document.createElement("span");
  entryPanel.className = "grid-entry-panel";

  const entryGrid = document.createElement("span");
  entryGrid.className = "grid-entry-grid";
  Array.from({ length: 9 }, (_, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.className = [0, 4, 8].includes(index) ? "diagonal" : "";
    input.setAttribute("aria-label", `Grid cell ${index + 1}`);
    entryGrid.append(input);
  });

  const status = document.createElement("span");
  status.className = "grid-entry-status";
  status.textContent = "Fill the grid.";

  const clearButton = document.createElement("button");
  clearButton.className = "grid-entry-clear";
  clearButton.type = "button";
  clearButton.textContent = "Clear";

  entryPanel.append(entryGrid, status, clearButton);

  const copy = document.createElement("span");
  copy.className = "grid-question-copy";

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = format.intro;

  const rules = document.createElement("span");
  rules.className = "grid-question-rules";
  format.rules.forEach((rule, index) => {
    const rulePill = document.createElement("span");
    const badge = document.createElement("b");
    badge.textContent = index + 1;
    const label = document.createElement("strong");
    label.textContent = rule.label;
    const text = document.createElement("em");
    text.textContent = rule.text;
    rulePill.append(badge, label, text);
    rules.append(rulePill);
  });

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  copy.append(intro, rules, ask);
  layout.append(entryPanel, copy);
  questionText.append(title, layout);
  setupGridChallenge(entryPanel);
}

function setupGridChallenge(entryPanel) {
  const inputs = [...entryPanel.querySelectorAll(".grid-entry-grid input")];
  const status = entryPanel.querySelector(".grid-entry-status");
  const clearButton = entryPanel.querySelector(".grid-entry-clear");
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  const cols = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  const diagonal = [0, 4, 8];

  const validate = () => {
    const values = inputs.map((input) => input.value);
    const invalid = new Set();
    const filled = values.filter(Boolean).length;

    inputs.forEach((input) => input.classList.remove("right", "wrong", "diagonal-win"));
    status.className = "grid-entry-status";

    const markLineIssues = (line) => {
      const counts = new Map();
      line.forEach((index) => {
        const value = values[index];
        if (value) {
          counts.set(value, (counts.get(value) || 0) + 1);
        }
      });
      line.forEach((index) => {
        const value = values[index];
        if (value && counts.get(value) > 1) {
          invalid.add(index);
        }
      });
    };

    [...rows, ...cols].forEach(markLineIssues);

    if (filled === inputs.length) {
      const diagonalSum = diagonal.reduce((sum, index) => sum + Number(values[index]), 0);
      if (diagonalSum !== 9) {
        diagonal.forEach((index) => invalid.add(index));
      }
    }

    invalid.forEach((index) => inputs[index].classList.add("wrong"));

    if (filled === 0) {
      status.textContent = "Fill the grid.";
      return;
    }

    if (invalid.size) {
      status.textContent = "Check the red boxes.";
      status.classList.add("wrong");
      return;
    }

    if (filled === inputs.length) {
      inputs.forEach((input) => input.classList.add("right"));
      diagonal.forEach((index) => inputs[index].classList.add("diagonal-win"));
      status.textContent = "Correct grid. Diagonal sum = 9.";
      status.classList.add("right");
      return;
    }

    status.textContent = "Looks good so far.";
  };

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^1-3]/g, "").slice(0, 1);
      validate();
      if (input.value && inputs[index + 1]) {
        inputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
        inputs[index - 1].focus();
      }
    });
  });

  clearButton.addEventListener("click", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
    validate();
    inputs[0].focus();
  });

  validate();
}

function chooseAnswer(optionIndex) {
  if (answered) {
    return;
  }
  answered = true;

  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];
  const buttons = document.querySelectorAll(".answer-option");
  const feedback = document.querySelector("#feedback");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) {
      button.classList.add("correct");
    }
    if (index === optionIndex && optionIndex !== question.answer) {
      button.classList.add("wrong");
    }
  });

  if (optionIndex === question.answer) {
    quizScore += 1;
    feedback.textContent = "Correct. Nice reasoning.";
    feedback.classList.add("good");
  } else {
    feedback.textContent = `Not quite. The answer is ${question.options[question.answer]}.`;
    feedback.classList.add("try");
    const clue = document.querySelector("#question-clue");
    setQuestionClueContent(clue, question.clue || "Think about the rule, then test each option.", "answer");
    clue.classList.add("show");
  }

  document.querySelector("#quiz-score").textContent = quizScore;
  document.querySelector("#next-question").disabled = false;
}

function goToNextQuestion() {
  const module = modules[currentModuleIndex];
  if (quizIndex < module.quiz.length - 1) {
    quizIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const module = modules[currentModuleIndex];
  completedModules.add(module.id);
  saveCompleted();
  updateCompletedView();

  document.querySelector("#result-module").textContent = module.title;
  document.querySelector("#final-score").textContent = quizScore;

  const title = document.querySelector("#result-title");
  const message = document.querySelector("#result-message");
  if (quizScore === module.quiz.length) {
    title.textContent = "Perfect score!";
    message.textContent = "You used the ideas carefully and checked the rules like a real CT explorer.";
  } else if (quizScore >= Math.ceil(module.quiz.length * 0.6)) {
    title.textContent = "Module complete";
    message.textContent = "Good work. Review the missed ideas once and your reasoning will get sharper.";
  } else {
    title.textContent = "Keep practicing";
    message.textContent = "The module is marked complete, but try again to strengthen the main ideas.";
  }

  showSection("section-result");
  setActiveNav(String(currentModuleIndex));
}

function bindControls() {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.querySelector("#back-to-home").addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
  });

  document.querySelector("#back-to-module").addEventListener("click", () => {
    openModule(currentModuleIndex);
  });

  document.querySelector("#previous-module").addEventListener("click", () => {
    if (currentModuleIndex > 0) {
      openModule(currentModuleIndex - 1);
    }
  });

  document.querySelector("#next-module").addEventListener("click", () => {
    if (currentModuleIndex < modules.length - 1) {
      openModule(currentModuleIndex + 1);
    }
  });

  document.querySelector("#start-quiz").addEventListener("click", startQuiz);
  document.querySelector("#next-question").addEventListener("click", goToNextQuestion);

  document.querySelector("#choose-another").addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
  });

  document.querySelector("#retry-module").addEventListener("click", startQuiz);

  document.querySelector("#result-choose-another").addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
  });
}

renderNav();
renderModuleGrid();
bindControls();
updateCompletedView();
