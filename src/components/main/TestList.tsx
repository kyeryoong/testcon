import { useState } from "react";
import { Link } from "react-router-dom";

import { dbService } from "../../FirebaseModules";
import { doc, setDoc, collection } from "firebase/firestore";

import GetTestList from "../hooks/GetTestLists";
import GenerateShortTestCode from "../hooks/GenerateShortTestCode";

import Modal from "../../theme/Modal";
import Label from "../../theme/Label";
import InputBox from "../../theme/InputBox";
import Buttons from "../../theme/Buttons";
import SubmitButton from "../../theme/SubmitButton";
import colorPalette from "../../theme/ColorPalette";

import { toast } from "react-toastify";

import styles from "./TestList.module.css";



export default function TestList({ userCode, userName }: { userCode: string, userName: string }) {
    // 시험 목록 조회
    const testList = GetTestList(userCode);



    // 시험 생성
    const [isCreatingTest, setIsCreatingTest] = useState<boolean>(false);

    const [testName, setTestName] = useState<string>("");

    const [colorIndex, setColorIndex] = useState<number>(0);

    const shortTestCode = GenerateShortTestCode(userCode);



    async function createTest(event: any) {
        event.preventDefault();

        try {
            await setDoc(doc(collection(dbService, "users", userCode, "tests")), {
                managerCode: userCode,
                managerName: userName,
                created: Date.now(),
                shortTestCode: shortTestCode,
                testName: testName,
                startDate: Date.now(),
                duration: 60,
                webCam: false,
                idCard: false,
                feedback: false,
                feedbackTime: {
                    start: Date.now(),
                    finish: Date.now()
                },
                feedbackScore: {
                    score: true,
                    rank: false,
                    average: false,
                },
                feedbackQnA: {
                    question: false,
                    answer: false
                },
                noticeChatting: false,
                reEntry: false,
                preview: true,
                color: 0
            })

            toast.success("시험 추가가 완료되었습니다.", { toastId: "" });

            setTestName("");
            setIsCreatingTest(false);
        }

        catch (error) {
            console.log(error);
            toast.error("시험 추가에 실패했습니다.", { toastId: "" });
        }
    }



    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.header}>
                    시험 목록
                </div>

                {
                    testList.map((elem: any) => (
                        <Link to={"/test/" + elem.testCode} style={{ textDecoration: "none" }}>
                            <div className={styles.testElements}>
                                <div
                                    className={styles.testProfile}
                                    style={{ background: `linear-gradient(135deg, rgba(${colorPalette[elem.color][0]}, ${colorPalette[elem.color][1]}, ${colorPalette[elem.color][2]}) 20%, rgb(${colorPalette[elem.color][0] - 40}, ${colorPalette[elem.color][1] - 40}, ${colorPalette[elem.color][2] - 40}) 80%)` }}
                                />

                                <div className={styles.testName}>
                                    {elem.testName}
                                </div>
                            </div>
                        </Link>
                    ))
                }

                <div className={styles.createTestButton} onClick={() => setIsCreatingTest(true)}>
                    <img className={styles.createTestIcon} src={process.env.PUBLIC_URL + "/icons/dashboard/add_empty.svg"} />

                    <div>
                        시험 추가
                    </div>
                </div>



                {
                    isCreatingTest

                    &&

                    <Modal title="시험 추가" onClose={() => setIsCreatingTest(false)}>
                        <div
                            className={styles.colorProfile}
                            style={{ background: `linear-gradient(135deg, rgba(${colorPalette[colorIndex][0]}, ${colorPalette[colorIndex][1]}, ${colorPalette[colorIndex][2]}) 20%, rgb(${colorPalette[colorIndex][0] - 40}, ${colorPalette[colorIndex][1] - 40}, ${colorPalette[colorIndex][2] - 40}) 80%)` }}
                        >
                            {testName[0]}
                        </div>

                        <div className={styles.colorButtonContainer}>
                            {colorPalette.map((elem, index) => (
                                <div
                                    className={styles.colorButton}
                                    style={{ backgroundColor: String(`rgb(${elem[0]}, ${elem[1]}, ${elem[2]})`) }}
                                    onClick={() => setColorIndex(index)}
                                />
                            ))}
                        </div>



                        <Label>
                            시험 이름
                        </Label>

                        <InputBox
                            type="text"
                            value={testName}
                            onChange={(event: any) => setTestName(event.target.value)}
                        />
                        <br /><br /><br />

                        <Buttons>
                            <SubmitButton
                                text="추가"
                                onClick={createTest}
                                disabled={testName.replace(/(\s*)/g, "") === ""}
                            />
                        </Buttons>
                    </Modal>
                }
            </div>
        </div>
    )
}