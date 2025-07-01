import Swal from "sweetalert2"

export const ErrorAlert = (title: string, subtitle? : string) => {
    Swal.fire({
        icon: "error",
        title: title,
        text: subtitle
    })
}