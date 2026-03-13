// Authentication & Authorization Module

// Admin wallet address (Ethereum address to be designated as admin)
// Change this to your actual admin wallet address
const ADMIN_WALLET_ADDRESS = '0x617ab556EDA00942826C0BF08B7Ac99e45CCAF84'; // Replace with actual admin wallet
const SESSION_KEY = 'user_session';
const ROLE_KEY = 'user_role';
const WALLET_KEY = 'connected_wallet';

// Roles
const ROLES = {
    ADMIN: 'admin',
    STUDENT: 'student',
    EMPLOYER: 'employer',
    GUEST: 'guest'
};

/**
 * Check if wallet address is admin
 */
function isAdminWallet(walletAddress) {
    if (!walletAddress) return false;
    return walletAddress.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
}

/**
 * Login with MetaMask wallet
 */
function loginWithMetaMask(walletAddress) {
    if (!walletAddress) {
        return { 
            success: false, 
            message: 'Vui lòng kết nối ví MetaMask trước!',
            role: null 
        };
    }

    // Normalize wallet address
    const normalizedWallet = walletAddress.toLowerCase().trim();
    console.log('LOGIN: Ví kết nối:', normalizedWallet);
    console.log('LOGIN: Ví admin:', ADMIN_WALLET_ADDRESS.toLowerCase());
    
    // Determine role based on wallet address
    let role = ROLES.STUDENT; // Default role for all wallets
    let isAdmin = false;

    if (isAdminWallet(normalizedWallet)) {
        role = ROLES.ADMIN;
        isAdmin = true;
        console.log('LOGIN: ✅ Bạn là ADMIN!');
    } else {
        console.log('LOGIN: Bạn là STUDENT');
    }

    // Create session
    const session = {
        role: role,
        walletAddress: normalizedWallet,
        loginTime: new Date().getTime(),
        expiresIn: 8 * 60 * 60 * 1000 // 8 hours
    };
    
    console.log('LOGIN: Lưu session:', session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(WALLET_KEY, normalizedWallet);
    
    if (isAdmin) {
        return { 
            success: true, 
            message: 'Đăng nhập Admin thành công!',
            role: ROLES.ADMIN
        };
    } else {
        return { 
            success: true, 
            message: 'Đăng nhập Student thành công!',
            role: ROLES.STUDENT
        };
    }
}

/**
 * Set admin wallet address (for configuration purposes)
 */
function setAdminWallet(walletAddress) {
    if (!walletAddress || walletAddress.trim() === '') {
        return false;
    }
    // Note: In a real application, this should be done server-side
    // This is just for demonstration
    console.log('Admin wallet set to:', walletAddress);
    return true;
}

/**
 * Logout
 */
function logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(WALLET_KEY);
    window.location.href = '../index.html';
}

/**
 * Get current user session
 */
function getCurrentSession() {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    
    try {
        const parsedSession = JSON.parse(session);
        
        // Check if session is expired
        if (new Date().getTime() - parsedSession.loginTime > parsedSession.expiresIn) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }
        
        return parsedSession;
    } catch (error) {
        console.error('Error parsing session:', error);
        return null;
    }
}

/**wallet address
 */
function getCurrentWallet() {
    const session = getCurrentSession();
    return session ? session.walletAddress : null;
}

/**
 * Get current 
 * Get current user role
 */
function getCurrentUserRole() {
    const session = getCurrentSession();
    return session ? session.role : ROLES.GUEST;
}

/**
 * Check if user is authenticated as admin
 */
function isAdminLoggedIn() {
    const session = getCurrentSession();
    return session && session.role === ROLES.ADMIN;
}

/**
 * Check if user is authenticated (any role)
 */
function isAuthenticated() {
    return getCurrentSession() !== null;
}

/**
 * Check if user has specific role
 */
function hasRole(role) {
    const currentRole = getCurrentUserRole();
    return currentRole === role;
}

/**
 * Check if user can perform admin actions
 */
function canAddStudents() {
    return hasRole(ROLES.ADMIN);
}

function canAddGrades() {
    return hasRole(ROLES.ADMIN);
}

function canIssueDegrees() {
    return hasRole(ROLES.ADMIN);
}

function canRevokeDegrees() {
    return hasRole(ROLES.ADMIN);
}

function canViewStudents() {
    // Admin can view students
    // Students and employers can view (read-only)
    return hasRole(ROLES.ADMIN) || hasRole(ROLES.STUDENT) || hasRole(ROLES.EMPLOYER);
}

function canVerifyDegrees() {
    // Everyone can verify degrees
    return true;
}

/**
 * Protect admin pages - redirect to login if not authenticated
 */
function protectAdminPage() {
    if (!isAdminLoggedIn()) {
        alert('Bạn không có quyền truy cập trang này. Vui lòng đăng nhập!');
        window.location.href = '../login-admin.html';
    }
}

/**
 * Show/hide admin-only buttons based on role
 */
function updateUIBasedOnRole() {
    const role = getCurrentUserRole();
    const wallet = getCurrentWallet();
    const isAdmin = role === ROLES.ADMIN;
    
    // Hide admin-only forms/buttons for non-admin users
    const adminElements = document.querySelectorAll('[data-admin-only="true"]');
    adminElements.forEach(element => {
        element.style.display = isAdmin ? 'block' : 'none';
    });
    
    // Show public-only elements for non-admin
    const publicElements = document.querySelectorAll('[data-public-only="true"]');
    publicElements.forEach(element => {
        element.style.display = !isAdmin ? 'block' : 'none';
    });
    
    // Update user info display
    const userInfoEl = document.getElementById('userInfo');
    if (userInfoEl) {
        if (isAdmin) {
            const shortWallet = wallet ? wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4) : '';
            userInfoEl.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="text-white">👤 Admin (${shortWallet})</span>
                    <button onclick="logout()" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                        Đăng xuất
                    </button>
                </div>
            `;
        } else if (wallet) {
            const shortWallet = wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4);
            userInfoEl.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="text-white">👤 Student (${shortWallet})</span>
                    <button onclick="logout()" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                        Đăng xuất
                    </button>
                </div>
            `;
        } else {
            userInfoEl.innerHTML = '';
        }
    }
}

/**
 * Initialize authentication on page load
 */
function initAuth() {
    updateUIBasedOnRole();
}

// Auto-initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});
