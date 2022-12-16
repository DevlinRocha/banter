import { useEffect, useRef } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import {
  setTheme,
  useUserSettingsState,
} from "../../../../features/userSettings";
import { useAppDispatch } from "../../../../redux/hooks";

export default function MyAccountSettings() {
  const darkInputRef = useRef<HTMLInputElement>(null);
  const lightInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useUserSettingsState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!darkInputRef.current || !lightInputRef.current) return;
    switch (theme) {
      case "dark":
        darkInputRef.current.checked = true;
        break;
      case "light":
        lightInputRef.current.checked = true;
        break;
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setTheme(e.target.value));
  }
  return (
    <Container>
      <Heading>Appearance</Heading>

      <AppearanceSettings>
        <SubHeading>THEME</SubHeading>

        <SettingsContainer>
          <SettingContainer
            className={
              theme === "dark"
                ? "bg-dark-25"
                : "bg-gray-100 hover:bg-gray-100/75"
            }
          >
            <SettingInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="theme"
              value="dark"
              ref={darkInputRef}
              id="off"
              type="radio"
            />
            <SettingInputLabel htmlFor="off">
              <SettingLabelText>Dark</SettingLabelText>
            </SettingInputLabel>
          </SettingContainer>

          <SettingContainer
            className={
              theme === "light" ? "bg-gray-200" : "bg-dark-200 hover:bg-dark-50"
            }
          >
            <SettingInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="theme"
              value="light"
              ref={lightInputRef}
              id="low"
              type="radio"
            />
            <SettingInputLabel htmlFor="low">
              <SettingLabelText>Light</SettingLabelText>
            </SettingInputLabel>
          </SettingContainer>
        </SettingsContainer>
      </AppearanceSettings>
    </Container>
  );
}

const Container = tw.main`
  min-w-[542px] max-w-[740px] pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5 text-xl font-semibold
  dark:text-white
`;

const AppearanceSettings = tw.section`
  flex flex-col
`;

const SubHeading = tw.h5`
  mb-2 text-xs text-gray-800 font-semibold
  dark:text-text-primary
`;

const SettingsContainer = tw.div`
  flex flex-col max-w-[660px]
`;

const SettingContainer = tw.div`
  flex items-center mb-2 p-2.5 rounded-middle cursor-pointer
  dark:text-white
`;

const SettingInput = tw.input`
  w-min h-min ml-2 cursor-pointer scale-[1.75]
`;

const SettingInputLabel = tw.label`
  flex flex-col w-full mr-2 ml-4 cursor-pointer
`;

const SettingLabelText = tw.span`
`;
