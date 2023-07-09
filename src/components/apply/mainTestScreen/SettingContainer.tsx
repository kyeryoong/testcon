import Modal from "../../../theme/Modal";
import Label from "../../../theme/Label";
import RadioButton from "../../../theme/RadioButton";

import styles from "./SettingContainer.module.css";



export default function SettingContainer({ setShowSetting, screenMode, setScreenMode, lightMode, setLightMode }: { setShowSetting: any, screenMode: boolean, setScreenMode: any, lightMode: boolean, setLightMode: any }) {
    return (
        <Modal title="설정" onClose={() => setShowSetting(false)}>
            <Label>
                화면 분할
            </Label>

            <div className={styles.settingButton}>
                <RadioButton
                    value={screenMode}
                    onClick={() => setScreenMode(true)}
                />
                좌우로 분할
            </div>

            <div className={styles.settingButton}>
                <RadioButton
                    value={!screenMode}
                    onClick={() => setScreenMode(false)}
                />
                위아래로 분할
            </div>
            <br />



            <Label>
                화면 밝기
            </Label>

            <div className={styles.settingButton}>
                <RadioButton
                    value={lightMode}
                    onClick={() => setLightMode(true)}
                />
                밝은 화면
            </div>

            <div className={styles.settingButton}>
                <RadioButton
                    value={!lightMode}
                    onClick={() => setLightMode(false)}
                />
                어두운 화면
            </div>
        </Modal>
    )
}