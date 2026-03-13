// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentCredential {
    address public admin;

    struct Student {
        uint256 studentId;
        string fullName;
        string dateOfBirth;
        string course;
        uint256 enrollmentYear;
        address walletAddress;
        bool exists;
    }

    struct Grade {
        string subjectName;
        string semester;
        uint256 score;
    }

    struct Degree {
        uint256 degreeId;
        uint256 studentId;
        string degreeType;
        uint256 issueDate;
        string issuingOrganization;
        bool revoked;
    }

    mapping(uint256 => Student) public students;
    mapping(uint256 => Grade[]) public studentGrades;
    mapping(uint256 => Degree) public degrees;
    mapping(uint256 => uint256[]) public studentDegrees;
    mapping(address => uint256) public walletToStudentId; // Mapping từ wallet address -> student ID
    uint256[] public studentIds; // Track all student IDs

    uint256 public nextDegreeId = 1;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setAdmin(address _newAdmin) public onlyAdmin {
        require(_newAdmin != address(0), "Invalid admin address");
        admin = _newAdmin;
    }

    function createStudent(
        uint256 _studentId,
        string memory _fullName,
        string memory _dateOfBirth,
        string memory _course,
        uint256 _enrollmentYear,
        address _walletAddress
    ) public onlyAdmin {
        require(!students[_studentId].exists, "Student already exists");
        require(_walletAddress != address(0), "Invalid wallet address");
        students[_studentId] = Student(_studentId, _fullName, _dateOfBirth, _course, _enrollmentYear, _walletAddress, true);
        walletToStudentId[_walletAddress] = _studentId; // Lưu mapping wallet -> student ID
        studentIds.push(_studentId); // Add to student IDs list
    }

    function updateStudent(
        uint256 _studentId,
        string memory _fullName,
        string memory _dateOfBirth,
        string memory _course,
        uint256 _enrollmentYear
    ) public onlyAdmin {
        require(students[_studentId].exists, "Student does not exist");
        students[_studentId].fullName = _fullName;
        students[_studentId].dateOfBirth = _dateOfBirth;
        students[_studentId].course = _course;
        students[_studentId].enrollmentYear = _enrollmentYear;
    }

    function addGrade(
        uint256 _studentId,
        string memory _subjectName,
        string memory _semester,
        uint256 _score
    ) public onlyAdmin {
        require(students[_studentId].exists, "Student does not exist");
        studentGrades[_studentId].push(Grade(_subjectName, _semester, _score));
    }

    function getStudentGrades(uint256 _studentId) public view returns (Grade[] memory) {
        return studentGrades[_studentId];
    }

    function issueDegree(
        uint256 _studentId,
        string memory _degreeType,
        string memory _issuingOrganization
    ) public onlyAdmin {
        require(students[_studentId].exists, "Student does not exist");
        degrees[nextDegreeId] = Degree(nextDegreeId, _studentId, _degreeType, block.timestamp, _issuingOrganization, false);
        studentDegrees[_studentId].push(nextDegreeId);
        nextDegreeId++;
    }

    function revokeDegree(uint256 _degreeId) public onlyAdmin {
        require(degrees[_degreeId].degreeId != 0, "Degree does not exist");
        degrees[_degreeId].revoked = true;
    }

    function verifyDegree(uint256 _degreeId) public view returns (bool isValid, Degree memory degree) {
        degree = degrees[_degreeId];
        if (degree.degreeId == 0) {
            return (false, degree);
        }
        isValid = !degree.revoked;
    }

    function getStudent(uint256 _studentId) public view returns (Student memory) {
        return students[_studentId];
    }

    function getAllStudentIds() public view returns (uint256[] memory) {
        return studentIds;
    }

    function getStudentCount() public view returns (uint256) {
        return studentIds.length;
    }

    function getDegreesByStudent(uint256 _studentId) public view returns (uint256[] memory) {
        return studentDegrees[_studentId];
    }

    // ===================================
    // STUDENT-ONLY FUNCTIONS (Phân quyền)
    // ===================================

    /**
     * Lấy ID sinh viên từ địa chỉ ví hiện tại
     * Chỉ sinh viên có thể gọi hàm này
     */
    function getStudentIdByWallet(address _walletAddress) public view returns (uint256) {
        return walletToStudentId[_walletAddress];
    }

    /**
     * Lấy thông tin sinh viên của chính mình từ ví hiện tại
     * Chỉ sinh viên sở hữu ví đó mới được xem
     */
    function getStudentByWallet(address _walletAddress) public view returns (Student memory) {
        uint256 studentId = walletToStudentId[_walletAddress];
        require(studentId != 0 || students[studentId].exists, "Student not found for this wallet");
        return students[studentId];
    }

    /**
     * Lấy điểm số của sinh viên từ ví hiện tại
     * Chỉ sinh viên sở hữu ví đó mới được xem
     */
    function getStudentGradesByWallet(address _walletAddress) public view returns (Grade[] memory) {
        uint256 studentId = walletToStudentId[_walletAddress];
        require(studentId != 0 || students[studentId].exists, "Student not found for this wallet");
        return studentGrades[studentId];
    }

    /**
     * Lấy bằng cấp của sinh viên từ ví hiện tại
     * Chỉ sinh viên sở hữu ví đó mới được xem
     */
    function getStudentDegreesByWallet(address _walletAddress) public view returns (uint256[] memory) {
        uint256 studentId = walletToStudentId[_walletAddress];
        require(studentId != 0 || students[studentId].exists, "Student not found for this wallet");
        return studentDegrees[studentId];
    }
}