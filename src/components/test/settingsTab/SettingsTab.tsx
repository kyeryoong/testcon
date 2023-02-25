import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { dbService } from "../../../FirebaseModules";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import GetTestInfo from "../../hooks/GetTestInfo";

import { toast } from "react-toastify";

import styles from "./SettingsTab.module.css";



export default function SettingsTab({ testCode }: { testCode: string | undefined }) {
    const navigate = useNavigate();



    // 시험 정보
    const testInfo: any = GetTestInfo(testCode);



    // 시험 이름 변경
    const [isEditingTestName, setIsEditingTestName] = useState<boolean>(false);
    const [testName, setTestName] = useState<string>(testInfo.testName);

    useEffect(() => { setTestName(testInfo.testName); }, [testInfo])



    // 시작 일시
    const [isEditingTestTime, setIsEditingTestTime] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<any>("");
    const [duration, setDuration] = useState<any>("");

    useEffect(() => {
        setStartDate(new Date(testInfo.startDate).toLocaleDateString("sv-SE") + "T" + new Date(testInfo.startDate).toLocaleTimeString("en-US", { hour12: false }));
    }, [testInfo])

    useEffect(() => { setDuration(testInfo.duration); }, [testInfo])



    // 시험 삭제 여부
    const [isDeletingTest, setIsDeletingTest] = useState<boolean>(false);
    const [deletingTestConfirmText, setDeletingTestConfirmText] = useState<string>("");



    // 시험 이름 변경 함수
    async function editTestName(event: any) {
        event.preventDefault();

        if (testCode) {
            try {
                await updateDoc(doc(dbService, "tests", testCode), {
                    testName: testName,
                })

                toast.success("시험 이름이 변경되었습니다.");
                setIsEditingTestName(false);
            }

            catch (error) {
                console.log(error);
                toast.error("시험 이름이 변경에 실패했습니다.");
            }
        }
    }



    // 시작 일시 변경 함수
    async function editTestTime(event: any) {
        event.preventDefault();

        if (testCode) {
            try {
                await updateDoc(doc(dbService, "tests", testCode), {
                    startDate: Date.parse(startDate),
                    duration: duration
                })

                toast.success("시험 시작 일시와 응시 시간이 변경되었습니다.");
                setIsEditingTestTime(false);
                setIsEditingTestTime(false);
            }

            catch (error) {
                console.log(error);
                toast.error("시험 시작 일시와 응시 시간 변경에 실패했습니다.");
            }
        }
    }



    // 성적 공개 설정 변경 함수
    async function changeFeedback(event: any) {
        event.preventDefault();

        if (testCode) {
            try {
                await updateDoc(doc(dbService, "tests", testCode), {
                    feedback: !testInfo.feedback,
                })

                toast.success("종료 후 성적 공개 설정이 변경되었습니다.");
            }

            catch (error) {
                console.log(error);
                toast.error("종료 후성적 공개 설정 변경에 실패했습니다.");
            }
        }
    }


    // 시작 전 정보 공개 설정 변경 함수
    async function changeShowInfo(event: any) {
        event.preventDefault();

        if (testCode) {
            try {
                await updateDoc(doc(dbService, "tests", testCode), {
                    showInfo: !testInfo.showInfo,
                })

                toast.success("시작 전 정보 공개 설정이 변경되었습니다.");
            }

            catch (error) {
                console.log(error);
                toast.error("시작 전 정보 공개 설정 변경에 실패했습니다.");
            }
        }
    }



    // 시험 삭제 함수
    async function deleteTest(event: any) {
        event.preventDefault();

        if (testCode) {
            try {
                await deleteDoc(doc(dbService, "tests", testCode));

                navigate("/");
                toast.success("시험이 삭제되었습니다.");
            }

            catch (error) {
                console.log(error);
                toast.error("시험 삭제에 실패했습니다.");
            }
        }
    }



    return (
        <div>
            <div className={styles.settingsHeader}>
                시험 이름
            </div>

            
                {
                    isEditingTestName

                    ?

                    <form onSubmit={editTestName}>
                        <input
                            type="text"
                            className={styles.testNameInputBox}
                            value={testName}
                            onChange={(event) => {
                                setTestName(event.target.value);
                            }}
                            required
                        />
                        <br />

                        <input
                            type="submit"
                            className={styles.editButton}
                            value="변경 완료"
                        />

                        <input
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => {
                                setIsEditingTestName(false);
                                setTestName(testInfo.testName);
                            }}
                            value="변경 취소"
                        />
                    </form>

                    :

                    <div>
                        <div className={styles.settingsValue}>
                            {testInfo.testName}
                        </div>

                        <div
                            className={styles.editButton}
                            onClick={() => {
                                setIsEditingTestName(true);
                                setIsEditingTestTime(false);
                            }}
                        >
                            변경
                        </div>
                    </div>
                }
            


            <div className={styles.settingsHeader}>
                시험 코드
            </div>

            <div className={styles.settingsValue}>
                {testInfo.shortTestCode}
            </div>

            <div className={styles.description}>
                응시자들에게 6자리 시험 코드를 안내하여, 응시자들이 시험 응시 페이지에 접속할 수 있습니다.
            </div>



            {
                isEditingTestTime

                    ?

                    <form onSubmit={editTestTime}>
                        <div className={styles.dateContainer}>
                            <div>
                                <div className={styles.settingsHeader}>
                                    시작 일시
                                </div>

                                <input
                                    type="datetime-local"
                                    className={styles.startDateInputBox}
                                    value={startDate.toLocaleString("")}
                                    onChange={(event) => {
                                        setStartDate(event.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div>
                                <div className={styles.settingsHeader}>
                                    진행 시간
                                </div>

                                <input
                                    type="number"
                                    className={styles.durationInputBox}
                                    value={duration}
                                    onChange={(event) => {
                                        setDuration(event.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div>
                                <div className={styles.settingsHeader}>
                                    종료 일시
                                </div>

                                <div className={styles.settingsValue}>
                                    {new Date(testInfo?.startDate + testInfo?.duration * 60000).toLocaleString("ko-KR")}
                                </div>
                            </div>
                        </div>

                        <input
                            type="submit"
                            className={styles.editButton}
                            value="변경 완료"
                        />

                        <input
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => {
                                setIsEditingTestTime(false);
                                setStartDate(new Date(testInfo.startDate).toLocaleDateString("sv-SE") + "T" + new Date(testInfo.startDate).toLocaleTimeString("en-US", { hour12: false }));
                                setDuration(testInfo.duration);
                            }}
                            value="변경 취소"
                        />
                    </form>

                    :

                    <div>
                        <div className={styles.dateContainer}>
                            <div>
                                <div className={styles.settingsHeader}>
                                    시작 일시
                                </div>

                                <div className={styles.startEndDateValue}>
                                    {new Date(testInfo?.startDate).toLocaleString("ko-KR")}
                                </div>
                            </div>

                            <div>
                                <div className={styles.settingsHeader}>
                                    진행 시간
                                </div>

                                <div className={styles.durationValue}>
                                    {testInfo.duration}분
                                </div>
                            </div>

                            <div>
                                <div className={styles.settingsHeader}>
                                    종료 일시
                                </div>

                                <div className={styles.startEndDateValue}>
                                    {new Date(testInfo?.startDate + testInfo?.duration * 60000).toLocaleString("ko-KR")}
                                </div>
                            </div>
                        </div>

                        <div
                            className={styles.editButton}
                            onClick={() => {
                                setIsEditingTestName(false);
                                setIsEditingTestTime(true);
                            }}
                        >
                            변경
                        </div>
                    </div>
            }
                




            <div className={styles.settingsHeader}>
                시작 전 정보 공개
            </div>

            <div className={styles.feedbackContainer}>
                <button
                    className={testInfo.showInfo ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                    onClick={changeShowInfo}
                    disabled={testInfo.showInfo === true}
                    style={{ borderRadius: "5px 0px 0px 5px" }}
                >
                    공개
                </button>

                <button
                    className={!testInfo.showInfo ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                    onClick={changeShowInfo}
                    disabled={testInfo.showInfo === false}
                    style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                    비공개
                </button>
            </div>

            <div className={styles.description}>
                {
                    testInfo.feedback

                    ?

                    "시험이 시작되기 전 응시자들이 시험 문항 수, 응시 시간, 총점을 확인할 수 있습니다."

                    :

                    "시험이 시작되기 전 응시자들이 시험 문항 수, 응시 시간, 총점을 확인할 수 없습니다."
                }
            </div>



            <div className={styles.settingsHeader}>
                종료 후 성적 공개
            </div>

            <div className={styles.feedbackContainer}>
                <button
                    className={testInfo.feedback ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                    onClick={changeFeedback}
                    disabled={testInfo.feedback === true}
                    style={{ borderRadius: "5px 0px 0px 5px" }}
                >
                    공개
                </button>

                <button
                    className={!testInfo.feedback ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                    onClick={changeFeedback}
                    disabled={testInfo.feedback === false}
                    style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                    비공개
                </button>
            </div>

            <div className={styles.description}>
                {
                    testInfo.feedback

                    ?

                    "시험이 종료된 후 응시자들이 시험 문제, 본인의 답안지와 성적을 확인할 수 있습니다."

                    :

                    "시험이 종료된 후 응시자들이 시험 문제, 본인의 답안지와 성적을 확인할 수 없습니다."
                }
            </div>






            {/* 
                





            <div className={styles.header}>
                시간 설정
            </div>

            <div className={styles.settingsContainer}>
                <div className={styles.settingsContainerTop}>
                    <div className={styles.settingsContainerTop1}>
                        <div className={styles.settingsContainerTopHeader}>
                            시작 일시
                        </div>

                        <div className={styles.settingsContainerTopValue}>
                            {new Date(testInfo?.startDate).toLocaleString("ko-KR")}
                        </div>
                    </div>

                    <div className={styles.settingsContainerTop2}>
                        {
                            !isEditingStartDate

                                ?

                                <div
                                    className={styles.editButton}
                                    onClick={() => {
                                        setIsEditingTestName(false);
                                        setIsEditingStartDate(true);
                                        setIsEditingDuration(false);
                                    }}
                                >
                                    변경
                                </div>

                                :

                                <div
                                    className={styles.cancelButton}
                                    onClick={() => { setIsEditingStartDate(false); }}
                                >
                                    변경 취소
                                </div>
                        }
                    </div>
                </div>

                {
                    isEditingStartDate

                    &&

                    <form className={styles.settingsContainerBottom} onSubmit={editTestStartDate}>
                        <input
                            type="datetime-local"
                            className={styles.inputBox}
                            value={startDate.toLocaleString("")}
                            onChange={(event) => {
                                setStartDate(event.target.value);
                            }}
                            required
                        />

                        <input
                            type="submit"
                            className={styles.editButton}
                            value="변경 완료"
                        />
                    </form>
                }
            </div>



            <div className={styles.settingsContainer}>
                <div className={styles.settingsContainerTop}>
                    <div className={styles.settingsContainerTop1}>
                        <div className={styles.settingsContainerTopHeader}>
                            응시 시간
                        </div>

                        <div className={styles.settingsContainerTopValue}>
                            {testInfo?.duration}분
                        </div>
                    </div>

                    <div className={styles.settingsContainerTop2}>
                        {
                            !isEditingDuration

                                ?

                                <div
                                    className={styles.editButton}
                                    onClick={() => {
                                        setIsEditingTestName(false);
                                        setIsEditingStartDate(false);
                                        setIsEditingDuration(true);
                                    }}
                                >
                                    변경
                                </div>

                                :

                                <div
                                    className={styles.cancelButton}
                                    onClick={() => { setIsEditingDuration(false); }}
                                >
                                    변경 취소
                                </div>
                        }
                    </div>
                </div>

                {
                    isEditingDuration

                    &&

                    <form className={styles.settingsContainerBottom} onSubmit={editTestDuration}>
                        <input
                            type="number"
                            className={styles.inputBox}
                            value={duration}
                            onChange={(event) => {
                                setDuration(event.target.value);
                            }}
                            required
                        />

                        <input
                            type="submit"
                            className={styles.editButton}
                            value="완료"
                        />
                    </form>
                }
            </div>



            <div className={styles.settingsContainer}>
                <div className={styles.settingsContainerTop1}>
                    <div className={styles.settingsContainerTopHeader}>
                        종료 일시
                    </div>

                    <div className={styles.settingsContainerTopValue}>
                        {new Date(testInfo?.startDate + testInfo?.duration * 60000).toLocaleString("ko-KR")}
                    </div>
                </div>
            </div>



            <div className={styles.header}>
                시작 전 정보 공개 설정
            </div>

            <div className={styles.settingsContainer}>
                <div className={styles.feedbackContainer}>
                    <div className={styles.feedbackContainer1}>
                        시험 시작 전, 응시자들이 문항 수, 응시 시간, 총점을 확인할 수 있습니다.
                    </div>

                    <div className={styles.feedbackContainer2}>
                        <button
                            className={testInfo.showInfo ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                            onClick={changeShowInfo}
                            disabled={testInfo.showInfo === true}
                            style={{ borderRadius: "5px 0px 0px 5px" }}
                        >
                            공개
                        </button>

                        <button
                            className={!testInfo.showInfo ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                            onClick={changeShowInfo}
                            disabled={testInfo.showInfo === false}
                            style={{ borderRadius: "0px 5px 5px 0px" }}
                        >
                            비공개
                        </button>
                    </div>
                </div>
            </div>



            <div className={styles.header}>
                성적 공개 설정
            </div>

            <div className={styles.settingsContainer}>
                <div className={styles.feedbackContainer}>
                    <div className={styles.feedbackContainer1}>
                        시험이 종료되면, 응시자들이 문제와 정답을 확인할 수 있습니다.
                    </div>

                    <div className={styles.feedbackContainer2}>
                        <button
                            className={testInfo.feedback ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                            onClick={changeFeedback}
                            disabled={testInfo.feedback === true}
                            style={{ borderRadius: "5px 0px 0px 5px" }}
                        >
                            공개
                        </button>

                        <button
                            className={!testInfo.feedback ? styles.feedbackButtonOn : styles.feedbackButtonOff}
                            onClick={changeFeedback}
                            disabled={testInfo.feedback === false}
                            style={{ borderRadius: "0px 5px 5px 0px" }}
                        >
                            비공개
                        </button>
                    </div>
                </div>
            </div>




            <div className={styles.header}>
                시험 삭제
            </div>

            <div className={styles.settingsContainer}>
                <div className={styles.feedbackContainer}>
                    <div className={styles.feedbackContainer1}>
                        시험을 삭제합니다. 문제, 응시자 목록, 답안지가 전부 삭제됩니다.
                    </div>

                    {
                        !isDeletingTest

                            ?

                            <div className={styles.feedbackContainer2}>
                                <div className={styles.cancelButton} onClick={() => { setIsDeletingTest(true); }}>
                                    시험 삭제
                                </div>
                            </div>

                            :

                            <div className={styles.feedbackContainer2}>
                                <div
                                    className={styles.deleteCancelButton}
                                    onClick={() => { setIsDeletingTest(false); }}
                                >
                                    삭제 취소
                                </div>
                            </div>
                    }

                </div>



                {
                    isDeletingTest

                    &&

                    <form className={styles.deleteContainer} onSubmit={deleteTest}>
                        <div className={styles.deleteReminder}>
                            시험을 삭제하려면 시험 이름을 입력하신 후 확인을 누르세요.<br />
                            <span style={{color: "rgb(250, 50, 50)"}}>이 작업은 되돌릴 수 없으며, 삭제된 정보는 복구가 불가능합니다.</span>
                        </div>

                        <div className={styles.deleteContainerBottom}>
                            <input
                                type="text"
                                className={styles.inputBox}
                                value={deletingTestConfirmText}
                                onChange={(event) => {
                                    setDeletingTestConfirmText(event.target.value);
                                }}
                            />

                            <input
                                type="submit"
                                className={styles.deleteConfirmButton}
                                value="삭제"
                                disabled={deletingTestConfirmText !== testInfo.testName}
                            />
                        </div>
                    </form>
                }
            </div> */}
        </div>
    )
}