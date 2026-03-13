// Contract configuration
const CONTRACT_ADDRESS = '0x446EEF87B7C62Fe5A32ff06040Be527D43851a43';
const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs":  [

                   ],
        "name":  "admin",
        "outputs":  [
                        {
                            "internalType":  "address",
                            "name":  "",
                            "type":  "address"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "",
                           "type":  "uint256"
                       }
                   ],
        "name":  "degrees",
        "outputs":  [
                        {
                            "internalType":  "uint256",
                            "name":  "degreeId",
                            "type":  "uint256"
                        },
                        {
                            "internalType":  "uint256",
                            "name":  "studentId",
                            "type":  "uint256"
                        },
                        {
                            "internalType":  "string",
                            "name":  "degreeType",
                            "type":  "string"
                        },
                        {
                            "internalType":  "uint256",
                            "name":  "issueDate",
                            "type":  "uint256"
                        },
                        {
                            "internalType":  "string",
                            "name":  "issuingOrganization",
                            "type":  "string"
                        },
                        {
                            "internalType":  "bool",
                            "name":  "revoked",
                            "type":  "bool"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [

                   ],
        "name":  "nextDegreeId",
        "outputs":  [
                        {
                            "internalType":  "uint256",
                            "name":  "",
                            "type":  "uint256"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "",
                           "type":  "uint256"
                       },
                       {
                           "internalType":  "uint256",
                           "name":  "",
                           "type":  "uint256"
                       }
                   ],
        "name":  "studentDegrees",
        "outputs":  [
                        {
                            "internalType":  "uint256",
                            "name":  "",
                            "type":  "uint256"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "",
                           "type":  "uint256"
                       },
                       {
                           "internalType":  "uint256",
                           "name":  "",
                           "type":  "uint256"
                       }
                   ],
        "name":  "studentGrades",
        "outputs":  [
                        {
                            "internalType":  "string",
                            "name":  "subjectName",
                            "type":  "string"
                        },
                        {
                            "internalType":  "string",
                            "name":  "semester",
                            "type":  "string"
                        },
                        {
                            "internalType":  "uint256",
                            "name":  "score",
                            "type":  "uint256"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "",
                           "type":  "uint256"
                       }
                   ],
        "name":  "studentIds",
        "outputs":  [
                        {
                            "internalType":  "uint256",
                            "name":  "",
                            "type":  "uint256"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "",
                           "type":  "uint256"
                       }
                   ],
        "name":  "students",
        "outputs":  [
                        {
                            "internalType":  "uint256",
                            "name":  "studentId",
                            "type":  "uint256"
                        },
                        {
                            "internalType":  "string",
                            "name":  "fullName",
                            "type":  "string"
                        },
                        {
                            "internalType":  "string",
                            "name":  "dateOfBirth",
                            "type":  "string"
                        },
                        {
                            "internalType":  "string",
                            "name":  "course",
                            "type":  "string"
                        },
                        {
                            "internalType":  "uint256",
                            "name":  "enrollmentYear",
                            "type":  "uint256"
                        },
                        {
                            "internalType":  "address",
                            "name":  "walletAddress",
                            "type":  "address"
                        },
                        {
                            "internalType":  "bool",
                            "name":  "exists",
                            "type":  "bool"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_studentId",
                           "type":  "uint256"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_fullName",
                           "type":  "string"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_dateOfBirth",
                           "type":  "string"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_course",
                           "type":  "string"
                       },
                       {
                           "internalType":  "uint256",
                           "name":  "_enrollmentYear",
                           "type":  "uint256"
                       },
                       {
                           "internalType":  "address",
                           "name":  "_walletAddress",
                           "type":  "address"
                       }
                   ],
        "name":  "createStudent",
        "outputs":  [

                    ],
        "stateMutability":  "nonpayable",
        "type":  "function"
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_studentId",
                           "type":  "uint256"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_fullName",
                           "type":  "string"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_dateOfBirth",
                           "type":  "string"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_course",
                           "type":  "string"
                       },
                       {
                           "internalType":  "uint256",
                           "name":  "_enrollmentYear",
                           "type":  "uint256"
                       }
                   ],
        "name":  "updateStudent",
        "outputs":  [

                    ],
        "stateMutability":  "nonpayable",
        "type":  "function"
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_studentId",
                           "type":  "uint256"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_subjectName",
                           "type":  "string"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_semester",
                           "type":  "string"
                       },
                       {
                           "internalType":  "uint256",
                           "name":  "_score",
                           "type":  "uint256"
                       }
                   ],
        "name":  "addGrade",
        "outputs":  [

                    ],
        "stateMutability":  "nonpayable",
        "type":  "function"
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_studentId",
                           "type":  "uint256"
                       }
                   ],
        "name":  "getStudentGrades",
        "outputs":  [
                        {
                            "components":  [
                                               {
                                                   "internalType":  "string",
                                                   "name":  "subjectName",
                                                   "type":  "string"
                                               },
                                               {
                                                   "internalType":  "string",
                                                   "name":  "semester",
                                                   "type":  "string"
                                               },
                                               {
                                                   "internalType":  "uint256",
                                                   "name":  "score",
                                                   "type":  "uint256"
                                               }
                                           ],
                            "internalType":  "struct StudentCredential.Grade[]",
                            "name":  "",
                            "type":  "tuple[]"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_studentId",
                           "type":  "uint256"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_degreeType",
                           "type":  "string"
                       },
                       {
                           "internalType":  "string",
                           "name":  "_issuingOrganization",
                           "type":  "string"
                       }
                   ],
        "name":  "issueDegree",
        "outputs":  [

                    ],
        "stateMutability":  "nonpayable",
        "type":  "function"
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_degreeId",
                           "type":  "uint256"
                       }
                   ],
        "name":  "revokeDegree",
        "outputs":  [

                    ],
        "stateMutability":  "nonpayable",
        "type":  "function"
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_degreeId",
                           "type":  "uint256"
                       }
                   ],
        "name":  "verifyDegree",
        "outputs":  [
                        {
                            "internalType":  "bool",
                            "name":  "isValid",
                            "type":  "bool"
                        },
                        {
                            "components":  [
                                               {
                                                   "internalType":  "uint256",
                                                   "name":  "degreeId",
                                                   "type":  "uint256"
                                               },
                                               {
                                                   "internalType":  "uint256",
                                                   "name":  "studentId",
                                                   "type":  "uint256"
                                               },
                                               {
                                                   "internalType":  "string",
                                                   "name":  "degreeType",
                                                   "type":  "string"
                                               },
                                               {
                                                   "internalType":  "uint256",
                                                   "name":  "issueDate",
                                                   "type":  "uint256"
                                               },
                                               {
                                                   "internalType":  "string",
                                                   "name":  "issuingOrganization",
                                                   "type":  "string"
                                               },
                                               {
                                                   "internalType":  "bool",
                                                   "name":  "revoked",
                                                   "type":  "bool"
                                               }
                                           ],
                            "internalType":  "struct StudentCredential.Degree",
                            "name":  "degree",
                            "type":  "tuple"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_studentId",
                           "type":  "uint256"
                       }
                   ],
        "name":  "getStudent",
        "outputs":  [
                        {
                            "components":  [
                                               {
                                                   "internalType":  "uint256",
                                                   "name":  "studentId",
                                                   "type":  "uint256"
                                               },
                                               {
                                                   "internalType":  "string",
                                                   "name":  "fullName",
                                                   "type":  "string"
                                               },
                                               {
                                                   "internalType":  "string",
                                                   "name":  "dateOfBirth",
                                                   "type":  "string"
                                               },
                                               {
                                                   "internalType":  "string",
                                                   "name":  "course",
                                                   "type":  "string"
                                               },
                                               {
                                                   "internalType":  "uint256",
                                                   "name":  "enrollmentYear",
                                                   "type":  "uint256"
                                               },
                                               {
                                                   "internalType":  "address",
                                                   "name":  "walletAddress",
                                                   "type":  "address"
                                               },
                                               {
                                                   "internalType":  "bool",
                                                   "name":  "exists",
                                                   "type":  "bool"
                                               }
                                           ],
                            "internalType":  "struct StudentCredential.Student",
                            "name":  "",
                            "type":  "tuple"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [

                   ],
        "name":  "getAllStudentIds",
        "outputs":  [
                        {
                            "internalType":  "uint256[]",
                            "name":  "",
                            "type":  "uint256[]"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs":  [

                   ],
        "name":  "getStudentCount",
        "outputs":  [
                        {
                            "internalType":  "uint256",
                            "name":  "",
                            "type":  "uint256"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "walletToStudentId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs":  [
                       {
                           "internalType":  "uint256",
                           "name":  "_studentId",
                           "type":  "uint256"
                       }
                   ],
        "name":  "getDegreesByStudent",
        "outputs":  [
                        {
                            "internalType":  "uint256[]",
                            "name":  "",
                            "type":  "uint256[]"
                        }
                    ],
        "stateMutability":  "view",
        "type":  "function",
        "constant":  true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "getStudentIdByWallet",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "getStudentByWallet",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "studentId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "fullName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "dateOfBirth",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "course",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "enrollmentYear",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    }
                ],
                "internalType": "struct StudentCredential.Student",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "getStudentGradesByWallet",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "subjectName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "semester",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "score",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct StudentCredential.Grade[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "getStudentDegreesByWallet",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
]
;

function getContract() {
    return new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
}
