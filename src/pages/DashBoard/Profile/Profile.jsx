import { Input, Button, ProgressBar } from '../../../common/components/';
import styles from './Profile.module.css'
import React, { useState, useEffect } from 'react'
import { useUserContext } from '../../../common/hooks/'
import { PROFILE_FIELDS } from '../../../constants/'
import { auth, uploadBytesResumable, storage, ref, getDownloadURL, updateNewProfile, updateProfile } from '../../../utils/'
function Profile() {
    let user = useUserContext()

    const [inputRef, setInputRef] = useState(null)
    const { loggedInUser, setLoggedInUser } = user
    const { uid, fullName, email, phoneNumber, address, displayName, avatar } = loggedInUser;
    const [file, setFile] = useState({
        fileURL: null,
        uploadProgress: 0,
        message: ''
    })

    const [fieldsInput, setFieldsInput] = useState({
        fullName: {
            value: fullName,
            isChanging: false
        },
        email: {
            value: email,
            isChanging: false
        },
        phoneNumber: {
            value: phoneNumber,
            isChanging: false
        },
        displayName: {
            value: displayName,
            isChanging: false
        },
        address: {
            value: address,
            isChanging: false
        },
        avatar: {
            isChanging: false
        },
    })
    useEffect(() => {
        return () => {
            file.fileURL && URL.revokeObjectURL(file.fileURL.preview)
        }
    }, [file.fileURL]);



    //Change
    const handleChange = (e) => {
        let field = e.target.name
        if (field === 'avatar') {
            const imgFile = e.target.files[0];
            imgFile.preview = URL.createObjectURL(imgFile)
            setFile({
                ...file,
                fileURL: imgFile
            })
        }
        setFieldsInput({
            ...fieldsInput,
            [field]: {
                ...fieldsInput[field],
                value: e.target.value
            }

        })
    }

    useEffect(() => {
        if (inputRef) {
            inputRef.current.focus();
            setInputRef(null)
        }
        return
    }, [inputRef]);
    //Click
    const handlerClick = (e, ref) => {
        let field = e.target.name
        if (fieldsInput[field].isChanging) {
            if (field === "avatar") {
                setFieldsInput({
                    ...fieldsInput,
                    [field]: {
                        isChanging: !fieldsInput[field].isChanging
                    }
                })
                setFile({
                    fileURL: null,
                    uploadProgress: 0,
                    message: ''
                })
            } else {
                setFieldsInput({
                    ...fieldsInput,
                    [field]: {
                        value: loggedInUser[field],
                        isChanging: !fieldsInput[field].isChanging
                    }
                })
            }

        } else {
            setFieldsInput({
                ...fieldsInput,
                [field]: {
                    ...fieldsInput[field],
                    isChanging: !fieldsInput[field].isChanging
                }
            })
        }
        setInputRef(ref)
    }



    const handleUpdateProfile = (e) => {
        let field = e.target.name
        e.preventDefault()
        if (field === 'avatar') {
            const metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, `images/${uid}/${field}/${file.fileURL.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file.fileURL, metadata);
            let errors = ''
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case 'paused':
                            errors = 'Uploading is paused'
                            setFile({
                                ...file,
                                message: errors
                            })
                            break;
                        case 'running':
                            setFile({
                                ...file,
                                uploadProgress: progress
                            })
                            if (progress === 100) {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    updateNewProfile(uid, field, downloadURL)
                                    updateProfile(auth.currentUser, {
                                        photoURL: downloadURL
                                    })
                                    setLoggedInUser({
                                        ...loggedInUser,
                                        [field]: downloadURL
                                    })
                                    fileIsEmpty(field)
                                });
                            }
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                        case 'storage/canceled':
                        case 'storage/unknown':
                            errors = `Please try again later`
                            setFile({
                                ...file,
                                message: errors
                            })
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        default:
                            break;
                    }
                },

            );


        } else {
            if (fieldsInput[field].value !== loggedInUser[field]) {
                updateNewProfile(uid, field, fieldsInput[field].value)
                setLoggedInUser({
                    ...loggedInUser,
                    [field]: fieldsInput[field].value
                })
            }
            setFieldsInput({
                ...fieldsInput,
                [field]: {
                    ...fieldsInput[field],
                    isChanging: !fieldsInput[field].isChanging
                }
            })

        }

    }

    // is Empty 
    const fileIsEmpty = (field) => {
        setFieldsInput({
            ...fieldsInput,
            [field]: {
                isChanging: !fieldsInput[field].isChanging
            }
        })
        setFile({
            fileURL: null,
            uploadProgress: 0,
            message: ''
        })
    }



    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Your portfolio</h1>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={avatar} alt="Your avatar" />

            </div>
            <div className={styles.groupFieldsContainer}>
                {
                    PROFILE_FIELDS.map((fieldItem, index) => {
                        const key = fieldItem.key
                        const ref = fieldItem.ref
                        const type = fieldItem.type
                        const titleField = key.replace(/([a-z])([A-Z])/g, `$1 $2`)
                            .replace(/^./, function (str) { return str.toUpperCase(); })
                        return (
                            <div className={styles.groupFields} key={index}>
                                <div className={styles.fieldsContent}>
                                    <p className={styles.fieldsTitle}>{titleField || null}</p>
                                    <Input
                                        type={type}
                                        ref={ref}
                                        placeholder={`Enter Your ${titleField}`}
                                        name={key}
                                        value={fieldsInput[key].value}
                                        disabled={!fieldsInput[key].isChanging}
                                        onHandlerChange={handleChange}
                                    />
                                    {
                                        (key === 'avatar' &&
                                            (
                                                file.uploadProgress > 0 &&
                                                <ProgressBar value={file.uploadProgress} message={file.message} />


                                            )
                                        )
                                    }
                                </div>
                                {
                                    (
                                        key !== 'email' &&
                                        <div className={styles.btnContainer}>
                                            <Button
                                                name={key}
                                                title={fieldsInput[key].isChanging ? 'Cancel' : 'Change'}
                                                variant={styles.btnChangeProfile}
                                                refInputs={ref}
                                                onHandlerClick={handlerClick}

                                            />
                                            {
                                                (
                                                    fieldsInput[key].isChanging &&
                                                    <Button
                                                        title='Save'
                                                        name={key}
                                                        variant={styles.btnChangeProfile}
                                                        onHandlerClick={handleUpdateProfile} />
                                                ) || null
                                            }
                                        </div>
                                    ) || null
                                }

                            </div>

                        )
                    })

                }

            </div >
        </div>
    )
}

export default Profile