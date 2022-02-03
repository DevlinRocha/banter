import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useUserState } from "../../../../features/user";
import {
  setUserChangesMade,
  useUserSettingsState,
} from "../../../../features/userSettings";
import { useAppDispatch } from "../../../../redux/hooks";

export default function ServerEditRole() {
  //   const { user } = useUserState();
  //   const { userCopy } = useUserSettingsState();
  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     if (!roleCopy) return;

  //     if (role !== roleCopy) {
  //       dispatch(setUserChangesMade(true));
  //     } else {
  //       dispatch(setUserChangesMade(false));
  //     }
  //   }, [role, roleCopy]);

  function handleClick() {
    // dispatch(setRoleColor("#7CC6FE"));
  }

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    // dispatch(setRoleColor(e.target.value));
  }

  function handleRoleRename(e: React.ChangeEvent<HTMLTextAreaElement>) {
    // dispatch(setRoleName(e.target.value));
  }

  return (
    <Container>
      <Header>
        <Heading>EDIT ROLE - NEW ROLE</Heading>
        <Separator />
      </Header>

      <ContentContainer>
        <CustomizationContainer>
          <SettingsContainer>
            <SettingsHeading>
              ROLE NAME <RedText>*</RedText>
            </SettingsHeading>

            <RoleName
              //   onChange={handleRoleRename}
              type="text"
              defaultValue="new role"
              maxLength={100}
              required
            />
          </SettingsContainer>

          <SettingsContainer>
            <SettingsHeading>
              ROLE COLOR <RedText>*</RedText>
            </SettingsHeading>

            <ColorInputsContainer>
              <ColorInputContainer>
                <ColorButton onClick={handleClick} type="button" />

                <ColorInputLabel>Default</ColorInputLabel>
              </ColorInputContainer>

              <ColorInputContainer>
                <ColorInput
                  onChange={handleColorChange}
                  type="color"
                  //   value={server.role.color}
                />

                <ColorInputLabel>Custom</ColorInputLabel>
              </ColorInputContainer>
            </ColorInputsContainer>
          </SettingsContainer>

          <PermissionsContainer>
            <PermissionLabel>
              Display role members separately from online members
            </PermissionLabel>
            <PermissionInput type="checkbox" />
          </PermissionsContainer>
        </CustomizationContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = tw.div`
  pt-15 px-10 pb-20 min-w-[293px] max-w-[508px]
`;

const Header = tw.div`
  min-w-[243px] max-w-[458px]
`;

const Heading = tw.h1`
  mb-5 text-xl font-semibold w-165
`;

const Separator = tw.div`
  w-full mb-6 pb-1 border-b border-gray-200
`;

const ContentContainer = tw.div`
  flex
`;

const CustomizationContainer = tw.div`
  flex-1 min-w-[293px] max-w-[508px]
`;

const SettingsContainer = tw.div`
  mb-6 pb-6 border-b
`;
const SettingsHeading = tw.h5`
  mb-2 text-xs text-gray-600 font-semibold
`;

const ColorInputsContainer = tw.div`
  flex
`;

const ColorInputContainer = tw.div`
  flex flex-col mr-4 text-center
`;

const ColorInput = tw.input`
  w-[66px] h-[50px] rounded border-none
`;

const ColorButton = tw(ColorInput)`
  bg-gray-400
`;

const ColorInputLabel = tw.label`
  mt-1 text-xs text-gray-600
`;

const RoleName = tw.input`
  w-full h-10 p-2.5 pr-8 bg-gray-50 border border-gray-300 rounded-middle resize-none
`;

const RedText = tw.span`
  text-red-500
`;

const PermissionsContainer = tw.div`
  flex mb-5 cursor-pointer
`;

const PermissionLabel = tw.label`
  font-medium
`;

const PermissionInput = tw.input`
`;
