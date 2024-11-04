import { toast } from "react-toastify"

window.notify = (msg, type) => {
    switch (type) {
        case "success":
            toast.success(msg, type)
            break;
        case "error":
            toast.error(msg, type)
            break;
        case "info":
            toast.info(msg, type)
            break;
        case "warning":
            toast.warning(msg, type)
            break;
        case "dark":
            toast.dark(msg, type)
            break;
        default:
            toast(msg)
    }
}

window.getRandomId = () => Math.random().toString(36).slice(2)

window.isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

window.isValidPassword = password =>{
    const passwordRegex = /^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
}