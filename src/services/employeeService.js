// Employee API Service
const API_BASE_URL = "https://jyotiaircon.com/admin/api"

// Helper function to get auth headers
const getAuthHeaders = () => {
   // const token = localStorage.getItem('token');
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

// Employee API service class
class EmployeeService {
    // Fetch employees with pagination, search, sorting, and filtering
    static async getEmployees(params = {}) {
        const {
            page = 1,
            size = 10,
            search = '',
            sort = 'id',
            direction = 'asc',
            typeFilter = ''
        } = params;

        const queryParams = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            search,
            sort,
            direction,
            typeFilter
        });
       // console.log(`Fetching employees with params: ${queryParams.toString()}`);

        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/employeeList`, {
                method: 'POST',
                body: JSON.stringify({
                    offset: page.toString(),
                    limit: size.toString(),
                    search,
                    sort,
                    direction,
                    typeFilter
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            //console.log('Raw API Response:', JSON.stringify(data, null, 2));
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error fetching employees:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Create new employee
    static async createEmployee(employeeData) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/employees`, {
                method: 'POST',
                body: JSON.stringify({
                    ...employeeData,
                    createdDate: new Date().toISOString().split('T')[0],
                    createdBy: 'Current User' // In real app, get from auth context
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error creating employee:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Update employee
    static async updateEmployee(employeeId, employeeData) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/updateEmployee`, {
                method: 'POST',
                body: JSON.stringify({
                    id: employeeId,
                    ...employeeData,
                    updatedDate: new Date().toISOString().split('T')[0],
                    updatedBy: 'Current User'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Update employee API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error updating employee:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Delete employee (make inactive)
    static async deleteEmployee(employeeId) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/deleteEmployee`, {
                method: 'POST',
                body: JSON.stringify({
                    id: employeeId,
                    status: 'Inactive',
                    deletedDate: new Date().toISOString().split('T')[0],
                    deletedBy: 'Current User'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Delete employee API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error deleting employee:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Get single employee by ID
    static async getEmployeeById(employeeId) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/admin/employeeDetails`, {
                method: 'POST',
                body: JSON.stringify({
                    id: employeeId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Employee details API response:', data);
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error fetching employee:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Bulk operations
    static async bulkDeleteEmployees(employeeIds) {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/employees/bulk-delete`, {
                method: 'POST',
                body: JSON.stringify({ employeeIds })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Error bulk deleting employees:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // Export employees data
    static async exportEmployees(format = 'csv') {
        try {
            const response = await corsEnabledFetch(`${API_BASE_URL}/employees/export?format=${format}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            return {
                success: true,
                data: blob
            };
        } catch (error) {
            console.error('Error exporting employees:', error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }
}

export default EmployeeService;
