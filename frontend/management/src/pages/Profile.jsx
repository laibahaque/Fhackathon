import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    cnic: '',
    phone: '',
    designation: '',
    salary: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('employee'));
    if (saved) {
      setEmployee(saved);
      setFormData({
        name: saved.name || '',
        fatherName: saved.fatherName || '',
        cnic: saved.cnic || '',
        phone: saved.phone || '',
        designation: saved.designation || '',
        salary: saved.salary || ''
      });
      setImagePreview(saved.profileImage || '/assets/profile.png');
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    const updatedEmployee = { ...employee, ...formData, profileImage: imagePreview };
    localStorage.setItem('employee', JSON.stringify(updatedEmployee));
    setEmployee(updatedEmployee);
    setShowModal(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Salary Slip for ${employee.name}`, 10, 10);
    doc.text(`Designation: ${employee.designation}`, 10, 20);
    doc.text(`Salary: ${employee.salary}`, 10, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 40);
    doc.save('salary-slip.pdf');
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 mt-8 px-8">Profile Summary</h2>

      <div className="flex justify-between items-start p-8 bg-white rounded-2xl shadow-lg mx-8 mb-8 h-[650px]">
        {/* Left Side */}
        <div className="w-1/2 h-full overflow-y-auto text-gray-700 space-y-6 mt-10 ml-10">
          <div className="space-y-8 text-xl">
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Father's Name:</strong> {employee.fatherName || 'N/A'}</p>
            <p><strong>CNIC:</strong> {employee.cnic || 'N/A'}</p>
            <p><strong>Phone:</strong> {employee.phone || 'N/A'}</p>
            <p><strong>Designation:</strong> {employee.designation || 'N/A'}</p>
          </div>

          <div className="space-y-8 mt-8">
            <button
              onClick={generatePDF}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
            >
              Download Salary Slip
            </button>
            <br />
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Update Profile Information
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col items-center mt-12">
          <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gray-200">
            <img
              src={imagePreview || '/assets/profile.png'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="mt-6 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition duration-200">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl transform scale-100 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-4">
              ✏️ Update Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Father's Name</label>
                <input
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father's name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">CNIC</label>
                <input
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  placeholder="Enter CNIC number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Designation</label>
                <input
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter designation"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 border-t pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
