// Định nghĩa các khóa lưu trữ trong Local Storage
const TOKEN_STORAGE_KEY = "t";
const REFRESH_TOKEN_STORAGE_KEY = "t-r";
const TOKEN_REMEMBER_KEY = "t-s";

// Đối tượng để theo dõi thông tin xác thực
const auth = {
  token: undefined, // Mã thông báo xác thực của người dùng
  rememberToken: true, // Lựa chọn "Nhớ đăng nhập"
  refreshToken: undefined, // Mã thông báo làm mới
};

// Hàm để cập nhật lựa chọn "Nhớ đăng nhập"
export function setRememberToken(enable) {
  auth.rememberToken = enable;
  // Lưu giá trị "Nhớ đăng nhập" vào Local Storage
  if (enable) {
    window.localStorage.setItem(TOKEN_REMEMBER_KEY, "true");
  } else {
    window.localStorage.removeItem(TOKEN_REMEMBER_KEY);
  }
}

// Hàm để khởi tạo dữ liệu xác thực
export function initData(defaultRemember = true) {
  const rememberToken = window.localStorage.getItem(TOKEN_REMEMBER_KEY);

  // Nếu mặc định là "Nhớ đăng nhập" và trong Local Storage có giá trị
  if (defaultRemember && rememberToken !== "") {
    setRememberToken(true);
    auth.rememberToken = true;
  } else {
    auth.rememberToken = !!rememberToken;
  }

  // Nếu được chọn "Nhớ đăng nhập," thì lấy mã thông báo từ Local Storage
  if (auth.rememberToken && !auth.token) {
    auth.token = window.localStorage.getItem(TOKEN_STORAGE_KEY) || undefined;
  }
}

// Hàm để lấy mã thông báo xác thực
export function getToken() {
  // Nếu mã thông báo chưa được khởi tạo, thực hiện khởi tạo
  if (!auth.token) {
    initData();
  }
  return auth.token;
}

// Hàm để cập nhật mã thông báo xác thực
export function setToken(token) {
  auth.token = token;

  // Nếu được chọn "Nhớ đăng nhập" và có mã thông báo, lưu vào Local Storage
  if (auth.rememberToken && token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    // Ngược lại, xóa mã thông báo khỏi Local Storage
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

// Hàm để lấy mã thông báo làm mới
export function getRefreshToken() {
  return auth.refreshToken;
}

// Hàm để cập nhật mã thông báo làm mới
export function setRefreshToken(refreshToken) {
  auth.refreshToken = refreshToken;

  // Nếu được chọn "Nhớ đăng nhập" và có mã thông báo làm mới, lưu vào Local Storage
  if (auth.rememberToken && refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  } else {
    // Ngược lại, xóa mã thông báo làm mới khỏi Local Storage
    window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }
}

// Hàm để cập nhật thông tin xác thực từ dữ liệu nhận được
export function setDataToken(data) {
  setToken(data.token);
}
