import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
    useNavigate,
    Navigate,
    useSearchParams,
    Outlet,
} from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
// export const baseUrl = "https://dev-backend.raghdacell.com/api/";
// export const fileUrl = "https://dev-backend.raghdacell.com/storage/";

// export const baseUrl = "http://localhost:8000/api/";
// export const fileUrl = "http://localhost:8000/storage/";


export const baseUrl = "https://backend.raghdacell.com/api/";
export const fileUrl = "https://backend.raghdacell.com/storage/";

// export const baseUrl = process.env.REACT_APP_BASE_URL;
// export const fileUrl = process.env.REACT_APP_FILE_URL;

//!=============================================================> post data login
export const useLOGIN = (initialState) => {
    const [formData, setFormData] = useState(initialState); // data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async(url) => {
        setLoading(true);
        setError("");
        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (
                (value || +value === 0) &&
                value !== "null" &&
                value !== null &&
                value !== "undefined" &&
                value !== undefined
            ) {
                formDataToSend.append(key, value);
            }
        }
        axios
            .post(`${baseUrl}${url}`, formDataToSend)
            .then((req) => {
                setLoading(false);
                setError("");
                localStorage.setItem("token", req.data.data.token);
                navigate("/");
            })
            .catch((e) => {
                setError(e.response.data.message);
                setLoading(false);
            });
    };
    //
    return {
        setFormData,
        formData,
        handleChange,
        loading,
        error,
        handleSubmit,
    };
};

// !======================================================================================
export const usePOST = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [viewFile, setViewFile] = useState("");
    const [viewImages, setViewImages] = useState({});
    const [images, setImages] = useState({});
    const [checkArray, setCheckArray] = useState({});
    const [dataPlayer, setDataPlayer] = useState();

    const naviget = useNavigate();
    //=====================================================> function change   data all
    const handleChangeInput = (event) => {
        const { name, value, type, files, checked } = event.target;
        const newValue =
            type === "file" ? files[0] : type === "checkbox" ? checked : value;
        type === "file" && setViewFile(URL.createObjectURL(newValue));
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue === true ? 1 : newValue === false ? 0 : newValue,
        }));
    };
    //=====================================================>  function change  array images
    const handleChangeArrayImages = (event) => {
        const { files, name } = event.target;
        setImages({...images, [name]: [files[0]] });
        if (images[name]) {
            setImages({
                ...images,
                [name]: [...images[name], files[0]],
            });
        }
        setViewImages({...viewImages, [name]: [URL.createObjectURL(files[0])] });
        if (images[name]) {
            setViewImages({
                ...viewImages,
                [name]: [...viewImages[name], URL.createObjectURL(files[0])],
            });
        }
    };
    //=====================================================> function change   array checkbox
    const handleCheckedArray = (e) => {
        const { value, checked, name } = e.target;
        if (checked) {
            setCheckArray({...checkArray, [name]: [value] });
            if (checkArray[name]) {
                setCheckArray({
                    ...checkArray,
                    [name]: [...checkArray[name], value],
                });
            }
        } else {
            if (checkArray[name]) {
                setCheckArray({
                    ...checkArray,
                    [name]: checkArray[name].filter((p) => p !== value),
                });
            }
        }
    };
    const { setShowPopUp, setTest } = useContextTranslate();
    //=====================================================> post data
    const handleSubmit = async(url, route, noRoute, reload) => {
        setLoading(true);
        setError("");
        if (url === `change-currency`) {
            setTest("test2");
        }
        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (
                (value || +value === 0) &&
                value !== "null" &&
                value !== null &&
                value !== "undefined" &&
                value !== undefined
            ) {
                formDataToSend.append(key, value);
            }
        }
        for (const [key, value] of Object.entries(checkArray)) {
            for (let i = 0; i < value.length; i++) {
                formDataToSend.append(key, value[i]);
            }
        }
        for (const [key, value] of Object.entries(images)) {
            for (let i = 0; i < value.length; i++) {
                formDataToSend.append(key, value[i]);
            }
        }

        axios
            .post(`${baseUrl}${url}`, formDataToSend, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((req) => {
                if (
                    url === `login?check=1&local=${localStorage.getItem("language")}` ||
                    url === `signup?validate=1&local=${localStorage.getItem("language")}`
                ) {
                    sessionStorage.setItem("number", req?.data.data?.user?.phone_number);
                    console.log(req?.data.data?.user?.phone_number);
                }
                if (url === `change-currency`) {
                    setTest("taaam");
                }
                setLoading(false);
                setError("");
                setShowPopUp(false);
                setDataPlayer(req);
                // route
                //   ? naviget(route)
                //   : noRoute
                //   ? console.log("s")
                //   : reload
                //   ? window.location.reload()
                //   : window.history.go(-1);
                if (route) {
                    naviget(route);
                } else if (noRoute) {
                    console.log("s");
                } else if (reload) {
                    window.location.reload();
                } else {
                    const initialUrl = window.location.href;

                    window.history.go(-1);

                    setTimeout(() => {
                        if (window.location.href === initialUrl) {
                            naviget("/"); // Replace '/home' with the actual path to your home page
                        }
                    }, 100); // Adjust the timeout as needed
                }
            })

        .catch((e) => {
            setError(e.response?.data.message);
            setLoading(false);
            setDataPlayer(e);
        });
    };

    return {
        formData,
        setFormData,
        viewFile, //  لعرض الصورة او فيديو .....
        setViewFile, // ((local)) لحذف الصورة
        viewImages, // لعرض الصور
        setViewImages, // ((local)) لحذف الصور
        images, //api  لأرسال الصور الى
        setImages, //api  لحذف الصور الى
        error,
        setError,
        loading,
        setLoading,
        handleChangeInput,
        handleCheckedArray,
        handleChangeArrayImages,
        handleSubmit,
        dataPlayer,
    };
};
export const logout = (url) => {
    axios
        .post(
            `${baseUrl}${url}`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
        .then((req) => {
            localStorage.removeItem("token");
            window.location.reload();
        })
        .catch((e) => {});
};
//!=============================================================>start fetch data
export const useFETCH = (url, urlDelete) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isErroe, setIsError] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    const naviget = useNavigate();
    useEffect(() => {
        setIsLoading(true);
        if (url) {
            setPrevUrl(url);
            axios
                .get(`${baseUrl}${url}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((req) => {
                    if (req) {
                        setData(req);
                        setIsLoading(false);
                        setIsError("");
                    }
                })
                .catch((e) => {
                    setIsLoading(false);
                    setIsError("خطأ في جلب البيانات");

                    if (e.request.status === 401) {
                        localStorage.removeItem("token");
                    }
                    if (e.request.status === 403) {
                        naviget("/403");
                    }
                });
        }
    }, [url]);

    const reCallUrl = async(e) => {
        if (url) {
            axios
                .get(`${baseUrl}${url}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((req) => {
                    if (req) {
                        setData(req);
                        setIsLoading(false);
                        setIsError("");
                    }
                })
                .catch((e) => {
                    setIsLoading(false);
                    setIsError("خطأ في جلب البيانات");

                    if (e.request.status === 401) {
                        localStorage.removeItem("token");
                    }
                    if (e.request.status === 403) {
                        naviget("/403");
                    }
                });
        }
    };

    //?=============================================================> deleteItem
    const deleteItem = async(e) => {
        setIsLoading(true);
        axios
            .delete(`${baseUrl}${urlDelete || url}/${e.id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((req) => {
                setIsLoading(false);
                setIsError("تم الحذف  بنجاح");
                window.location.reload();
            })
            .catch((e) => {
                setIsLoading(false);
                setIsError(" خطأ في الحذف  حاول مرة آخرى");
            });
    };
    return { data, isLoading, isErroe, deleteItem, prevUrl, reCallUrl };
};
//=============================================================> end fetch data

//?=============================================================> close items
export const useClose = () => {
    const [open, setOpen] = useState(false);
    const mouse = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (mouse.current) {
                if (!mouse.current.contains(e.target)) {
                    setOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.addEventListener("mousedown", handler);
        };
    }, []);

    return { open, setOpen, mouse };
};
//!=============================================================> pagination or filter or search
export const useFilter = (params) => {
    const [filter, setFilter] = useSearchParams();
    const handlePageClick = (event) => {
        setFilter(
            params || {
                page: event.selected + 1,
                sort_value: filter.get("sort_value") ? filter.get("sort_value") : "",
                sort_by: filter.get("sort_by") ? filter.get("sort_by") : "",
                state: filter.get("state") ? filter.get("state") : "",
            }
        );
    };
    return { filter, handlePageClick, setFilter };
};
//!=============================================================> عدم دخول من غير تسجيل دخول
export const RequireAuth = () => {
    if (!window.localStorage.getItem("token")) {
        return <Navigate to = "/sign-in" / > ;
    }

    return <Outlet / > ;
};
//! =============================================================>عدم فتح صفحة تسجيل دخول اذا مسجل مسيقا
export const RequireLogin = () => {
    if (window.localStorage.getItem("token")) {
        return <Navigate to = "/" / > ;
    }
    return <Outlet / > ;
};
//!=============================================================> تكبير الصورة
export const clickZoomInImage = (event) => {
    event.target.requestFullscreen();
};

export const Enter = (fun) => {
    document.onkeyup = function(e) {
        if (e.key === "Enter") {
            fun();
        }
    };
};

export const checkOrderStatus = () => {
    var url = "automated/get/status/bulk";
    axios.get(`${baseUrl}${url}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
};