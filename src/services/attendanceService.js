// Attendance API Service
const API_BASE_URL = "https://jyotiaircon.com/admin/api"

// Helper function to get auth headers
const getAuthHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
};

// CORS-enabled fetch function
const corsEnabledFetch = async (url, options = {}) => {
    const defaultOptions = {
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
        }
    };

    // For proxy requests, use same-origin mode
    if (url.startsWith('/api/proxy')) {
        defaultOptions.mode = 'same-origin';
        defaultOptions.credentials = 'same-origin';
    }

    console.log(`Making ${options.method || 'GET'} request to: ${url}`);
    
    try {
        const response = await fetch(url, { ...defaultOptions, ...options });
        console.log(`Response received: ${response.status} ${response.statusText}`);
        return response;
    } catch (error) {
        console.error(`Fetch error for ${url}:`, error);
        throw error;
    }
};

// Attendance API service class
class AttendanceService {
    // Fetch attendance records with filtering
    static async getAttendance(params = {}) {
        const {
            page = 1,
            size = 100,
            startDate = '',
            endDate = '',
            employeeId = '',
            status = ''
        } = params;

        console.log(`Fetching attendance with params:`, params);

        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/attendanceList`, {
                method: 'POST',
                body: JSON.stringify({
                    offset: page.toString(),
                    limit: size.toString(),
                    startDate,
                    endDate,
                    employeeId,
                    status
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Attendance API Response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error fetching attendance:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Get attendance for a specific employee
    static async getEmployeeAttendance(employeeId, params = {}) {
        const {
            startDate = '',
            endDate = ''
        } = params;

        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/employeeAttendance`, {
                method: 'POST',
                body: JSON.stringify({
                    employeeId,
                    startDate,
                    endDate
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Employee attendance API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error fetching employee attendance:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Mark attendance for an employee
    static async markAttendance(attendanceData) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/markAttendance`, {
                method: 'POST',
                body: JSON.stringify({
                    ...attendanceData,
                    markedDate: new Date().toISOString().split('T')[0],
                    markedBy: 'Current User'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Mark attendance API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error marking attendance:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Update attendance record
    static async updateAttendance(attendanceId, attendanceData) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/updateAttendance`, {
                method: 'POST',
                body: JSON.stringify({
                    id: attendanceId,
                    ...attendanceData,
                    updatedDate: new Date().toISOString().split('T')[0],
                    updatedBy: 'Current User'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Update attendance API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error updating attendance:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Delete attendance record
    static async deleteAttendance(attendanceId) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/deleteAttendance`, {
                method: 'POST',
                body: JSON.stringify({
                    id: attendanceId,
                    deletedDate: new Date().toISOString().split('T')[0],
                    deletedBy: 'Current User'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Delete attendance API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error deleting attendance:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Get attendance statistics
    static async getAttendanceStats(params = {}) {
        const {
            startDate = '',
            endDate = '',
            employeeId = ''
        } = params;

        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/attendanceStats`, {
                method: 'POST',
                body: JSON.stringify({
                    startDate,
                    endDate,
                    employeeId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Attendance stats API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error fetching attendance stats:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }
}

export default AttendanceService;
