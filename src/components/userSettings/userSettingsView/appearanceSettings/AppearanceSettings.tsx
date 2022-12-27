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
          <SettingContainer>
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

          <SettingContainerLight>
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
          </SettingContainerLight>
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
  flex flex-col min-w-[440px]
`;

const SettingContainer = tw.div`
  flex items-center mb-2 pl-2.5 bg-gray-100 rounded-middle cursor-pointer w-full h-[47px] text-text-quinary
  hover:bg-gray-100/75
  dark:bg-dark-50/60 dark:text-white
`;

const SettingContainerLight = tw(SettingContainer)`
  bg-gray-200 text-text-senary
  dark:bg-dark-200 dark:text-text-primary dark:hover:bg-dark-50/40
`;

const SettingInput = tw.input`
  w-5 h-5 cursor-pointer accent-black
  dark:accent-white
`;

const SettingInputLabel = tw.label`
  flex flex-col w-full p-2.5 cursor-pointer
`;

const SettingLabelText = tw.span`
`;
