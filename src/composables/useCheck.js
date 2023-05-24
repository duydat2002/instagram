import { ref } from "vue";

export const useCheck = () => {
  const checkError = ref(null);

  const checkPhoneNumber = async (phoneNumber) => {
    checkError.value = null;
    try {
      const response = await fetch(
        `http://apilayer.net/api/validate?access_key=3795577425cbd6583046f0fc3e8ebe97&number=${phoneNumber}&country_code=VN`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      if (!data.valid) {
        checkError.value = "Số điện thoại không được sử dụng.";
      }
      return data.valid;
    } catch (error) {
      checkError.value = error.message;
    }
  };

  const checkEmail = async (email) => {
    checkError.value = null;
    try {
      const response = await fetch(
        `http://apilayer.net/api/check?access_key=8813f94640e80400147342db28f69de4&email=${email}&smtp=1`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      const { success, format_valid, smtp_check } = data;
      if (success == undefined) {
        if (smtp_check) return format_valid && smtp_check;
        else throw new Error("Email không được sử dụng.");
      } else {
        throw new Error("Email không được sử dụng.");
      }
    } catch (error) {
      checkError.value = error.message;
      return false;
    }
  };

  return { checkError, checkPhoneNumber, checkEmail };
};
