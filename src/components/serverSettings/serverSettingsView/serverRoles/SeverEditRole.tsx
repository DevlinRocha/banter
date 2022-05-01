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
  const nameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const topColors = [
    "rgb(26, 188, 156)",
    "rgb(46, 204, 113)",
    "rgb(52, 152, 219)",
    "rgb(155, 89, 182)",
    "rgb(233, 30, 99)",
    "rgb(241, 196, 15)",
    "rgb(230, 126, 34)",
    "rgb(231, 76, 60)",
    "rgb(149, 165, 166)",
    "rgb(96, 125, 139)",
  ];

  const bottomColors = [
    "rgb(17, 128, 106)",
    "rgb(31, 139, 76)",
    "rgb(32, 102, 148)",
    "rgb(113, 54, 138)",
    "rgb(173, 20, 87)",
    "rgb(194, 124, 14)",
    "rgb(168, 67, 0)",
    "rgb(153, 45, 34)",
    "rgb(151, 156, 159)",
    "rgb(84, 110, 122)",
  ];

  useEffect(() => {
    if (!nameRef.current || !colorRef.current) return;

    nameRef.current.value = currentRole.name;

    colorRef.current.value = currentRole.color.includes("rgb")
      ? "#FFFFFF"
      : currentRole.color;
  }, [currentRole]);

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const color = e.target.value;

    changeColor(color);
  }

  function changeColor(color: string) {
    const newRole = { ...currentRole };

    newRole.color = color;

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleRoleRename(e)
              }
              ref={nameRef}
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

            <SettingsText>
              Members use the color of the highest role they have on the roles
              list.
            </SettingsText>

            <ColorInputsContainer>
              <ColorInputContainer>
                <DefaultColorButton
                  onClick={() => changeColor("rgb(153, 170, 181)")}
                  type="button"
                />

                <ColorInputLabel>Default</ColorInputLabel>
              </ColorInputContainer>

              <ColorInputContainer>
                <ColorInput
                  onChange={handleColorChange}
                  ref={colorRef}
                  type="color"
                  defaultValue={
                    currentRole.color.includes("rgb")
                      ? "#FFFFFF"
                      : currentRole.color
                  }
                />

                <ColorInputLabel>Custom</ColorInputLabel>
              </ColorInputContainer>

              <SmallColorsContainer>
                <ColorsRowContainer>
                  {topColors.map((color, index) => {
                    return (
                      <SmallColorButton
                        style={{ backgroundColor: color }}
                        onClick={() => changeColor(color)}
                        key={index}
                      />
                    );
                  })}
                </ColorsRowContainer>

                <BottomColorsRowContainer>
                  {bottomColors.map((color, index) => {
                    return (
                      <SmallColorButton
                        style={{ backgroundColor: color }}
                        onClick={() => changeColor(color)}
                        key={index}
                      />
                    );
                  })}
                </BottomColorsRowContainer>
              </SmallColorsContainer>
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

interface ButtonProps {
  color: string;
}

const Container = tw.div`
  pt-15 pl-6 pb-20 min-w-[293px] max-w-[508px]
`;

const Header = tw.div`
  flex flex-col min-w-[243px] max-w-[508px]
`;

const Heading = tw.h1`
  mb-5 font-semibold truncate leading-5
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

const SettingsText = tw.span`
  flex mb-2 text-sm text-gray-800
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

const SmallColorsContainer = tw.div`
  flex flex-col
`;

const ColorsRowContainer = tw.div`
  flex
`;

const BottomColorsRowContainer = tw(ColorsRowContainer)`
  mt-2.5
`;

const SmallColorButton = tw.button`
  w-5 h-5 rounded-middle border mr-2.5
  ${(props: ButtonProps) => `bg-[${props.color}]`}
`;

const RoleName = tw.input`
  w-full h-10 p-2.5 pr-8 bg-gray-50 border border-gray-300 rounded-middle resize-none
`;

const RedText = tw.span`
  text-red-500
`;

const PermissionsContainer = tw.div`
  flex items-center mb-5
`;

const PermissionLabel = tw.label`
  min-w-[187px] max-w-[402px] font-medium cursor-pointer
`;

const PermissionInput = tw.input`
  w-10 h-6 cursor-pointer
`;
