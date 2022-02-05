import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import {
  updateServerRole,
  useServersState,
} from "../../../../features/servers";
import {
  setCurrentRole,
  useServerSettingsState,
} from "../../../../features/serverSettings";
import { useAppDispatch } from "../../../../redux/hooks";

export default function ServerEditRole() {
  const { server } = useServersState();
  const { currentRole, rolesCopy } = useServerSettingsState();
  const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.value = currentRole.name;
  }, [currentRole]);

  function handleClick() {
    const newRole = { ...currentRole };

    newRole.color = "#99AAB5";

    const index = server.roles.findIndex(
      (role) => role.sort === currentRole.sort
    );

    dispatch(updateServerRole({ index: index, newRole: newRole }));

    dispatch(setCurrentRole(newRole));
  }

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newRole = { ...currentRole };

    newRole.color = e.target.value;

    const index = server.roles.findIndex(
      (role) => role.sort === currentRole.sort
    );

    dispatch(updateServerRole({ index: index, newRole: newRole }));

    dispatch(setCurrentRole(newRole));
  }

  function handleRoleRename(e: React.ChangeEvent<HTMLInputElement>) {
    if (!rolesCopy) return;
    if (updateTimeout) clearTimeout(updateTimeout);

    const newRole = { ...currentRole };

    newRole.name = e.target.value;

    const index = server.roles.findIndex((role) => role.sort === newRole.sort);

    const timer = setTimeout(() => {
      dispatch(updateServerRole({ index: index, newRole: newRole }));
      dispatch(setCurrentRole(newRole));
    }, 500);

    setUpdateTimeout(timer);
  }

  return (
    <Container>
      <Header>
        <Heading>EDIT ROLE - {currentRole.name.toUpperCase()}</Heading>
        <Separator />
      </Header>

      <ContentContainer>
        <CustomizationContainer>
          <SettingsContainer>
            <SettingsHeading>
              ROLE NAME <RedText>*</RedText>
            </SettingsHeading>

            <RoleName
              onChange={(e) => handleRoleRename(e)}
              ref={inputRef}
              type="text"
              defaultValue={currentRole.name}
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
                <DefaultColorButton onClick={handleClick} type="button" />

                <ColorInputLabel>Default</ColorInputLabel>
              </ColorInputContainer>

              <ColorInputContainer>
                <ColorInput
                  onChange={handleColorChange}
                  type="color"
                  defaultValue={"#FFFFFF"}
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
  w-[66px] h-[50px] rounded border-none cursor-pointer
`;

const DefaultColorButton = tw(ColorInput)`
  bg-[#99AAB5]
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
  flex mb-5
`;

const PermissionLabel = tw.label`
  font-medium cursor-pointer
`;

const PermissionInput = tw.input`
  cursor-pointer
`;
