const StudentCredential = artifacts.require("StudentCredential");

module.exports = async function(callback) {
  try {
    const contract = await StudentCredential.deployed();
    const accounts = await web3.eth.getAccounts();

    console.log("Creating test students...");
    console.log("Admin account:", accounts[0]);
    console.log("Available accounts:", accounts);

    // Test data - using accounts from Ganache
    const students = [
      {
        studentId: 1001,
        fullName: "Phạm Trí Bình",
        dateOfBirth: "01/01/2002",
        course: "Công Nghệ Thông Tin",
        enrollmentYear: 2023,
        wallet: accounts[1] // Using second account
      },
      {
        studentId: 1002,
        fullName: "Nguyễn Văn A",
        dateOfBirth: "15/03/2002",
        course: "Kỹ Thuật Phần Mềm",
        enrollmentYear: 2023,
        wallet: accounts[2]
      },
      {
        studentId: 1003,
        fullName: "Trần Thị B",
        dateOfBirth: "20/05/2001",
        course: "An Ninh Mạng",
        enrollmentYear: 2022,
        wallet: accounts[3]
      },
      {
        studentId: 1004,
        fullName: "Lê Văn C",
        dateOfBirth: "10/07/2003",
        course: "Công Nghệ Thông Tin",
        enrollmentYear: 2024,
        wallet: accounts[4]
      },
      {
        studentId: 1005,
        fullName: "Hoàng Thị D",
        dateOfBirth: "25/09/2002",
        course: "Quản Trị Hệ Thống",
        enrollmentYear: 2023,
        wallet: accounts[5]
      }
    ];

    // Create students
    for (let student of students) {
      try {
        await contract.createStudent(
          student.studentId,
          student.fullName,
          student.dateOfBirth,
          student.course,
          student.enrollmentYear,
          student.wallet,
          { from: accounts[0] } // Admin account
        );
        console.log(`✅ Created student: ${student.fullName} (${student.wallet})`);
      } catch (error) {
        console.error(`❌ Failed to create student ${student.fullName}:`, error.message);
      }
    }

    // Add grades for student 1001
    try {
      await contract.addGrade(1001, "Lập Trình Web", "Học Kỳ 1", 85, { from: accounts[0] });
      await contract.addGrade(1001, "Cơ Sở Dữ Liệu", "Học Kỳ 1", 90, { from: accounts[0] });
      await contract.addGrade(1001, "Lập Trình OOP", "Học Kỳ 2", 88, { from: accounts[0] });
      console.log("✅ Added grades for student 1001");
    } catch (error) {
      console.error("❌ Failed to add grades:", error.message);
    }

    // Issue degree for student 1001
    try {
      await contract.issueDegree(1001, "Bằng Cấp Đại Học", "Trường Đại Học Khoa Học Tự Nhiên", { from: accounts[0] });
      console.log("✅ Issued degree for student 1001");
    } catch (error) {
      console.error("❌ Failed to issue degree:", error.message);
    }

    console.log("\n✅ Setup completed!");
    console.log("\nTest accounts:");
    students.forEach((s, i) => {
      console.log(`${i + 1}. ${s.fullName}: ${s.wallet}`);
    });

    callback();
  } catch (error) {
    console.error("Error:", error);
    callback(error);
  }
};
