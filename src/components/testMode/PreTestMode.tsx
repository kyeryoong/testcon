import { useState, useEffect } from "react";
import { useParams } from "react-router";

import styles from "./PreTestMode.module.css";



export default function PreTestMode({ testInfo, applicantName, isTestTime, setIsApplyingTest, noOfQuestions, typeOfQuestions, totalPoints }: { testInfo: any, applicantName: any, isTestTime: any, setIsApplyingTest: any, noOfQuestions: number, typeOfQuestions: any, totalPoints: number }) {
    const { testCode } = useParams();

    const [tab, setTab] = useState<number>(1);
    const [alert, setAlert] = useState<boolean>(false);

    const [check1, setCheck1] = useState<boolean>(false);
    const [check2, setCheck2] = useState<boolean>(false);
    const [check3, setCheck3] = useState<boolean>(false);

    const [agreement1, setAgreement1] = useState<boolean>(true);
    const [agreement2, setAgreement2] = useState<boolean>(false);
    const [agreement3, setAgreement3] = useState<boolean>(false);


    // 시험 유형
    const typeDictionary: { [index: string]: string } = {
        "객관식": "multiple_choice",
        "주관식": "short_answer",
        "참/거짓": "true_false",
        "서술형": "essay"
    }



    // 화면 너비
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => { setWidth(window.innerWidth); });
    });



    return (
        <div className={styles.background}>
            <img className={styles.backgroundPattern} src={process.env.PUBLIC_URL + "/graphics/pattern.png"} />

            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        {testInfo.testName}
                    </div>

                    <div className={styles.headerRight}>
                        <div className={styles.headerRight1}>
                            출제자
                        </div>

                        <div className={styles.headerRight2}>
                            {testInfo.userName}
                        </div>
                    </div>
                </div>

                {
                    (isTestTime[0] === "전" || isTestTime[0] === "중")

                        ?

                        <div className={styles.container}>
                            <div className={styles.containerLeft}>
                                <div className={styles.button}
                                    onClick={() => {
                                        setTab(1);
                                    }}>
                                    <div className={tab === 1 ? styles.buttonNumberSelected : styles.buttonNumberNotSelected}>
                                        {check1 ? <img className={styles.buttonChecked} src={process.env.PUBLIC_URL + "/icons/checked.png"} /> : "1"}
                                    </div>

                                    <div className={tab === 1 ? styles.buttonTextSelected : styles.buttonTextNotSelected}>
                                        시험 안내
                                    </div>
                                </div>

                                <div className={styles.button}
                                    onClick={() => {
                                        if (!check1) { setAlert(true); }
                                        else { setTab(2); }
                                    }}>
                                    <div className={tab === 2 ? styles.buttonNumberSelected : styles.buttonNumberNotSelected}>
                                        {check2 ? <img className={styles.buttonChecked} src={process.env.PUBLIC_URL + "/icons/checked.png"} /> : "2"}
                                    </div>

                                    <div className={tab === 2 ? styles.buttonTextSelected : styles.buttonTextNotSelected}>
                                        약관 동의
                                    </div>
                                </div>

                                <div className={styles.button}
                                    onClick={() => {
                                        if (!check1 || !check2) { setAlert(true); }
                                        else { setTab(3); }
                                    }}>
                                    <div className={tab === 3 ? styles.buttonNumberSelected : styles.buttonNumberNotSelected}>
                                        {check3 ? <img className={styles.buttonChecked} src={process.env.PUBLIC_URL + "/icons/checked.png"} /> : "3"}
                                    </div>

                                    <div className={tab === 3 ? styles.buttonTextSelected : styles.buttonTextNotSelected}>
                                        준비 완료
                                    </div>
                                </div>
                            </div>

                            {
                                tab === 1

                                &&

                                <div className={styles.containerRight}>
                                    <div className={styles.tabContainerTop}>
                                        {
                                            width < 1200

                                            &&

                                            <div className={styles.tabContainerTestName}>
                                                {testInfo.testName}
                                            </div>
                                        }

                                        <div className={styles.intro}>
                                            안녕하세요, <span className={styles.highlight}>{applicantName}</span>님.
                                        </div>

                                        <div className={styles.intro}>
                                            시험을 시작하기 전에 <span className={styles.highlight}>안내사항</span>을 확인해주세요.
                                        </div>

                                        <ol className={styles.guideContainer}>
                                            <li className={styles.guideElements}>
                                                Chrome 브라우저 환경에서 시험을 진행해주세요. 다른 브라우저에서는 시험이 원할히 진행되지 않을 수 있습니다.
                                            </li>

                                            <li className={styles.guideElements}>
                                                데스크탑에서 시험을 응시하길 권장합니다. 모바일 환경(스마트폰, 태블릿)에서도 응시는 가능하나  불편함이 있을 수 있습니다.
                                            </li>

                                            <li className={styles.guideElements}>
                                                원할한 시험 진행을 위해 무선 네트워크(Wi-Fi, LTE, 5G)대신 유선 네트워크(LAN)에서 시험을 응시해주세요. 카페, 도서관 등 공용 네트워크를 사용하는 장소는 권장하지 않습니다.
                                            </li>

                                            <li className={styles.guideElements}>
                                                개인의 응시 환경 또는 네트워크 연결 문제로 인한 문제로 인해 발생한 불이익은 책임지지 않으며, 응시자 본인에게 있습니다.
                                            </li>
                                        </ol>

                                        <div className={styles.checkBoxContainer} onClick={() => { setCheck1((prev) => !prev); }}>
                                            <div className={styles.checkBoxText}>
                                                위의 안내사항을 모두 확인했습니다.
                                            </div>

                                            <div className={check1 ? styles.checkBoxChecked : styles.checkBoxNotChecked}>
                                                {check1 && <img className={styles.checkBoxIcon} src={process.env.PUBLIC_URL + "/icons/checked.png"} />}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.tabContainerBottom}>
                                        <div
                                            className={check1 ? styles.nextButtonAbled : styles.nextButtonDisabled}
                                            onClick={() => {
                                                if (check1) { setTab(2); }
                                                else { setAlert(true); }
                                            }}
                                        >
                                            다음

                                            <img
                                                className={check1 ? styles.nextIconAbled : styles.nextIconDisabled}
                                                src={process.env.PUBLIC_URL + "/icons/arrow_right.png"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                tab === 2

                                &&

                                <div className={styles.containerRight}>
                                    <div className={styles.tabContainerTop}>
                                        {
                                            width < 1200

                                            &&

                                            <div className={styles.tabContainerTestName}>
                                                {testInfo.testName}
                                            </div>
                                        }

                                        <div className={styles.intro}>
                                            다음 <span className={styles.highlight}>약관 내용</span>을 확인해주세요.
                                        </div>

                                        <div className={styles.checkBoxContainer} onClick={() => { setCheck2((prev) => !prev); }}>
                                            <div className={styles.checkBoxText}>
                                                아래의 내용을 모두 확인했습니다.
                                            </div>

                                            <div className={check2 ? styles.checkBoxChecked : styles.checkBoxNotChecked}>
                                                {check2 && <img className={styles.checkBoxIcon} src={process.env.PUBLIC_URL + "/icons/checked.png"} />}
                                            </div>
                                        </div>

                                        <div className={styles.agreementWrapper}>
                                            <div className={styles.agreementContainer}>
                                                <div className={styles.agreementHeader} onClick={() => { setAgreement1((prev) => !prev); }}>
                                                    문제 저작권 보호 및 유출 금지 동의

                                                    <img className={agreement1 ? styles.agreementIconOpened : styles.agreementIconClosed} src={process.env.PUBLIC_URL + "/icons/arrow_right.png"} />
                                                </div>

                                                <div className={agreement1 ? styles.agreementTextShow : styles.agreementTextHide}>
                                                    본 시험 문제는 저작권의 보호를 받으며, 지문 및 보기에 대한 정보를 무단 복제, 공중송신 배포, 활용하거나 2차 저작물을 작성하는 등의 행위를 금합니다. 문제에 대한 정보를 시험 출제자의 동의 없이 타인에게 공개하거나 전달하는 행위는 출제자의 재산을 침해하는 것으로, 이를 위반할 경우 관계법에 의거 민사 또는 형사상의 법적 조치도 취할 수 있음을 알려드립니다.
                                                </div>
                                            </div>

                                            <div className={styles.agreementContainer}>
                                                <div className={styles.agreementHeader} onClick={() => { setAgreement2((prev) => !prev); }}>
                                                    부정행위 처리 동의

                                                    <img className={agreement2 ? styles.agreementIconOpened : styles.agreementIconClosed} src={process.env.PUBLIC_URL + "/icons/arrow_right.png"} />
                                                </div>

                                                <div className={agreement2 ? styles.agreementTextShow : styles.agreementTextHide}>
                                                    부정행위는 시험 규정 외 불공정하거나 부정한 방법을 이용하여 점수를 취득하거나 취득하려고 하는 행위 등 공정한 시험 평가에 저촉되는 모든 행위를 말합니다. 시험 진행 중 부정행위가 확인되는 경우, 시험 즉시 종료, 재시험 불가, 시험 성적 무효 처리 등의 조치가 이루어질 수 있으며 이에 동의합니다.
                                                </div>
                                            </div>

                                            <div className={styles.agreementContainer}>
                                                <div className={styles.agreementHeader} onClick={() => { setAgreement3((prev) => !prev); }}>
                                                    개인정보 수집·이용 동의

                                                    <img className={agreement3 ? styles.agreementIconOpened : styles.agreementIconClosed} src={process.env.PUBLIC_URL + "/icons/arrow_right.png"} />
                                                </div>

                                                <div className={agreement3 ? styles.agreementTextShow : styles.agreementTextHide}>
                                                    테스트콘이 제공하는 시험 기능 이용을 위하여 아래와 같이 개인 정보를 수집·이용 및 제공하고자 합니다. 아래 사항을 확인하신 후, 동의 여부를 체크해 주시길 바랍니다. 응시자는 개인 정보의 수집·이용 동의를 거부할 권리가 있습니다. 다만 제공받은 정보는 서비스 이용에 필수적인 항목으로 동의 거부 시에는 시험 참여가 제한됩니다.

                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>수집 목적</th>
                                                                <th>수집 항목</th>
                                                                <th style={{ borderRight: "none" }}>보유·이용 기간</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <tr>
                                                                <td>시험 평가 및 진행</td>
                                                                <td>시험 응시 결과(정답 유무, 점수, 채팅 목록 등)</td>
                                                                <td style={{ borderRight: "none" }}>수집 목적 달성 시 까지</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.tabContainerBottom}>
                                        <div
                                            className={check1 && check2 ? styles.nextButtonAbled : styles.nextButtonDisabled}
                                            onClick={() => {
                                                if (check1 && check2) { setTab(3); }
                                                else { setAlert(true); }
                                            }}
                                        >
                                            다음

                                            <img
                                                className={check1 && check2 ? styles.nextIconAbled : styles.nextIconDisabled}
                                                src={process.env.PUBLIC_URL + "/icons/arrow_right.png"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                tab === 3

                                &&

                                <div className={styles.containerRight}>
                                    <div className={styles.tabContainerTop}>
                                        {
                                            width < 1200

                                            &&

                                            <div className={styles.tabContainerTestName}>
                                                {testInfo.testName}
                                            </div>
                                        }

                                        {
                                            isTestTime[0] === "전"

                                                ?

                                                <div>
                                                    <div className={styles.intro}>
                                                        시험 준비가 모두 <span className={styles.highlight}>완료</span>되었습니다.
                                                    </div>

                                                    <div className={styles.intro}>
                                                        시간이 되면 <span className={styles.highlight}>시험 시작 버튼</span>을 눌러 시험을 시작해주세요.
                                                    </div>
                                                </div>

                                                :

                                                <div>
                                                    <div className={styles.intro}>
                                                        지금 시험이 <span className={styles.highlight}>진행중</span>입니다.
                                                    </div>

                                                    <div className={styles.intro}>
                                                        <span className={styles.highlight}>시험 시작 버튼</span>을 눌러 시험을 시작해주세요.
                                                    </div>
                                                </div>
                                        }


                                        <div className={styles.testInfoContainer}>
                                            <div className={styles.testInfoElements}>
                                                <div className={styles.testInfoHeader}>
                                                    시작 일시
                                                </div>

                                                <div className={styles.testInfoValue}>
                                                    {new Date(testInfo.startDate).getFullYear()}년&nbsp;
                                                    {new Date(testInfo.startDate).getMonth()}월&nbsp;
                                                    {new Date(testInfo.startDate).getDay()}일&nbsp;
                                                    {new Date(testInfo.startDate).getHours()}시&nbsp;
                                                    {new Date(testInfo.startDate).getMinutes()}분
                                                </div>
                                            </div>

                                            <div className={styles.testInfoElements}>
                                                <div className={styles.testInfoHeader}>
                                                    진행 시간
                                                </div>

                                                <div className={styles.testInfoValue}>
                                                    {testInfo.duration}분
                                                </div>
                                            </div>

                                            <div className={styles.testInfoElements}>
                                                <div className={styles.testInfoHeader}>
                                                    문항 수
                                                </div>

                                                <div className={styles.testInfoValue}>
                                                    총 {noOfQuestions}문제
                                                </div>
                                            </div>

                                            <div className={styles.testInfoElements}>
                                                <div className={styles.testInfoHeader}>
                                                    만점
                                                </div>

                                                <div className={styles.testInfoValue}>
                                                    총 {totalPoints}점
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.testInfoElements}>
                                            <div className={styles.testInfoHeader}>
                                                문제 유형
                                            </div>

                                            {["객관식", "참/거짓", "주관식", "서술형"].map((current: string) => (
                                                typeOfQuestions.includes(current)

                                                &&

                                                <span className={styles.testInfoValue} style={{ marginRight: "20px" }}>
                                                    {current}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.tab4Container}>
                                        {
                                            isTestTime[0] === "전"

                                            &&

                                            <div className={styles.tab4ContainerButtonsZone}>
                                                {
                                                    testCode !== "sample"

                                                        ?

                                                        <button
                                                            className={styles.demoButton}
                                                            onClick={() => {
                                                                window.open("/apply/sample/applicant/sample");
                                                            }}
                                                        >
                                                            시험 환경 테스트
                                                        </button>

                                                        :

                                                        <div />
                                                }

                                                <button className={styles.startButton} disabled>
                                                    {isTestTime[1][0] !== 0 && <span>{isTestTime[1][0]}일 </span>}
                                                    {isTestTime[1][1] !== 0 && <span>{isTestTime[1][1]}시간 </span>}
                                                    {isTestTime[1][2] !== 0 && <span>{isTestTime[1][2]}분 </span>}
                                                    {isTestTime[1][3]}초 후 시작
                                                </button>
                                            </div>
                                        }

                                        {
                                            isTestTime[0] === "중"

                                            &&

                                            <div className={styles.tab4ContainerButtonsZone}>
                                                <div />

                                                <button className={styles.startButton} onClick={() => { setIsApplyingTest(true); }}>
                                                    시험 시작
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                        :

                        <div className={styles.container} style={{ gridTemplateColumns: "0px 1fr" }}>
                            <div className={styles.containerLeft} />

                            <div className={styles.containerRight} style={{ borderRadius: "10px" }}>
                                <div className={styles.tabContainerTop}>
                                    <div className={styles.intro}>
                                        시험이 종료되었습니다.
                                    </div>

                                    <div className={styles.intro}>
                                        수고하셨습니다.
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>



            {
                alert

                &&

                <div className={styles.alertBackground}>
                    <div className={styles.alertContainer}>
                        동의를 해야 다음 단계로 넘어갈 수 있습니다.

                        <div className={styles.alertButton} onClick={() => { setAlert(false); }}>
                            확인
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}