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
        bytes32 degreeHash;  // Hash của mã ID bằng cấp (8 chữ số)
    }

    mapping(uint256 => Student) public students;
    mapping(uint256 => Grade[]) public studentGrades;
    mapping(uint256 => Degree) public degrees;
    mapping(uint256 => uint256[]) public studentDegrees;
    mapping(address => uint256) public walletToStudentId; // Mapping từ wallet address -> student ID
    mapping(bytes32 => uint256) public degreeHashToId; // Mapping từ degree hash -> degree ID
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
        string memory _issuingOrganization,
        bytes32 _degreeHash
    ) public onlyAdmin {
        require(students[_studentId].exists, "Student does not exist");
        require(_degreeHash != bytes32(0), "Degree hash cannot be empty");
        require(degreeHashToId[_degreeHash] == 0, "Degree hash already exists");
        
        degrees[nextDegreeId] = Degree(nextDegreeId, _studentId, _degreeType, block.timestamp, _issuingOrganization, false, _degreeHash);
        degreeHashToId[_degreeHash] = nextDegreeId;
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

    /**
     * Lấy chi tiết bằng cấp theo hash
     * Hash được tạo từ mã ID bằng (8 chữ số)
     */
    function getDegreeByHash(bytes32 _degreeHash) public view returns (Degree memory) {
        uint256 degreeId = degreeHashToId[_degreeHash];
        require(degreeId != 0, "Degree not found");
        return degrees[degreeId];
    }

    /**
     * Xác thực bằng cấp theo hash
     * Trả về thông tin đầy đủ của bằng cấp và sinh viên
     */
    function verifyDegreeByHash(bytes32 _degreeHash) public view returns (bool isValid, Degree memory degree, Student memory student) {
        uint256 degreeId = degreeHashToId[_degreeHash];
        if (degreeId == 0) {
            return (false, Degree(0, 0, "", 0, "", false, bytes32(0)), Student(0, "", "", "", 0, address(0), false));
        }
        
        degree = degrees[degreeId];
        student = students[degree.studentId];
        isValid = !degree.revoked && student.exists;
        
        return (isValid, degree, student);
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