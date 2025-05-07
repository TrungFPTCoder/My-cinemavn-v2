import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import '../../assest/LoginGoogle.css';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser, registerUser } from '../../service/apiRequest';
function LoginGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch account data
  // useEffect(() => {
  //   const loadAccounts = async () => {
  //     const accountsData = await fetchAccount();
  //     dispatch(setAccount(accountsData));
  //   };
  //   loadAccounts();
  // }, [dispatch]);

  // Google login
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        const userData = res.data;
        checkAndAddUser(userData);

        // console.log(res);
      } catch (err) {
        console.log('Login Failed', err);
      }
    },
    onError: (error) => {
      console.log('Login Failed', error);
    },
  });

  const checkAndAddUser = async (userData) => {
    const newUser = {
      email: userData.email,
      password: userData.sub, // Sử dụng `sub` làm mật khẩu mặc định
    };
    const registerNewUser = {
      email: userData.email,
      password: userData.sub, // Sử dụng `sub` làm mật khẩu mặc định
      username: userData.name,
      userImage: userData.picture,
    }

    try {
      // Kiểm tra xem tài khoản đã tồn tại hay chưa bằng cách gọi loginUser
      const response = await loginUser(newUser, dispatch, navigate);
      if (response.status === 200) {
        // Nếu đăng nhập thành công
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            document.querySelector(".swal2-container").style.zIndex = "9999";
            document.querySelector(".swal2-container").style.marginTop = "80px";
          },
        });
        Toast.fire({
          icon: "success",
          title: "Đăng nhập thành công",
        });
      } else {
        // Nếu tài khoản chưa tồn tại, tiến hành đăng ký
        const registerResponse = await registerUser(registerNewUser, dispatch);
        if (registerResponse) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
              document.querySelector(".swal2-container").style.zIndex = "9999";
              document.querySelector(".swal2-container").style.marginTop = "80px";
            },
          });
          Toast.fire({
            icon: "success",
            title: "Đăng ký và đăng nhập thành công",
          });
          navigate('/');
        }
      }
    } catch (error) {
      // Xử lý lỗi
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
          document.querySelector(".swal2-container").style.zIndex = "9999";
          document.querySelector(".swal2-container").style.marginTop = "80px";
        },
      });
      Toast.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      });
    }
  };

  return (
    <div>
      <button className='btn btn-login google mt-3' type='button' onClick={() => login()}>Login with Google</button>
    </div>
  );
}

export default LoginGoogle;