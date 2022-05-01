import { useEffect, useRef } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import {
  setServerContentFilter,
  useServersState,
} from "../../../features/servers";
import {
  setServerChangesMade,
  useServerSettingsState,
} from "../../../features/serverSettings";
import { useAppDispatch } from "../../../redux/hooks";

export default function ServerModeration() {
  const offInputRef = useRef<HTMLInputElement>(null);
  const lowInputRef = useRef<HTMLInputElement>(null);
  const mediumInputRef = useRef<HTMLInputElement>(null);
  const highInputRef = useRef<HTMLInputElement>(null);
  const { server } = useServersState();
  const { serverCopy } = useServerSettingsState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !offInputRef.current ||
      !lowInputRef.current ||
      !mediumInputRef.current ||
      !highInputRef.current
    )
      return;
    switch (server.contentFilter) {
      case "off":
        offInputRef.current.checked = true;
        break;
      case "low":
        lowInputRef.current.checked = true;
        break;
      case "medium":
        mediumInputRef.current.checked = true;
        break;
      case "high":
        highInputRef.current.checked = true;
        break;
    }
  });

  useEffect(() => {
    if (!serverCopy) return;

    if (server !== serverCopy) {
      dispatch(setServerChangesMade(true));
    } else {
      dispatch(setServerChangesMade(false));
    }
  }, [server, serverCopy]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newContentFilter = e.target.value;
    dispatch(setServerContentFilter(newContentFilter));
  }

  return (
    <Container>
      <Heading>Moderation</Heading>

      <ServerSettings>
        <SubHeading>EXPLICIT MEDIA CONTENT FILTER</SubHeading>

        <SubTextContainer>
          <SubText>
            Automatically prevent sharing gifs sent in this server that contains
            explicit content. Please choose how broadly the filter will apply to
            members in your server.{" "}
            <Bold>We recommend setting a filter for a public Banter.</Bold>
          </SubText>
        </SubTextContainer>

        <SettingsContainer>
          <SettingContainer
            className={
              server.contentFilter === "off"
                ? "bg-gray-200"
                : "bg-gray-100 hover:bg-gray-100/75"
            }
          >
            <SettingInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="contentFilter"
              value="off"
              ref={offInputRef}
              id="off"
              type="radio"
            />
            <SettingInputLabel htmlFor="off">
              <SettingLabelText>
                {"Don't scan any media content."}
              </SettingLabelText>
              <SettingLabelSubText>
                My friends are nice most of the time.
              </SettingLabelSubText>
            </SettingInputLabel>
          </SettingContainer>

          <SettingContainer
            className={
              server.contentFilter === "low"
                ? "bg-gray-200"
                : "bg-gray-100 hover:bg-gray-100/75"
            }
          >
            <SettingInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="contentFilter"
              value="low"
              ref={lowInputRef}
              id="low"
              type="radio"
            />
            <SettingInputLabel htmlFor="low">
              <SettingLabelText>Keep a low filter.</SettingLabelText>
              <SettingLabelSubText>
                Gets rid of the harder stuff.
              </SettingLabelSubText>
            </SettingInputLabel>
          </SettingContainer>

          <SettingContainer
            className={
              server.contentFilter === "medium"
                ? "bg-gray-200"
                : "bg-gray-100 hover:bg-gray-100/75"
            }
          >
            <SettingInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="contentFilter"
              value="medium"
              ref={mediumInputRef}
              id="medium"
              type="radio"
            />
            <SettingInputLabel htmlFor="medium">
              <SettingLabelText>
                Filter out some media content.
              </SettingLabelText>
              <SettingLabelSubText>
                Helps keep everything PG-rated.
              </SettingLabelSubText>
            </SettingInputLabel>
          </SettingContainer>

          <SettingContainer
            className={
              server.contentFilter === "high"
                ? "bg-gray-200"
                : "bg-gray-100 hover:bg-gray-100/75"
            }
          >
            <SettingInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="contentFilter"
              value="high"
              ref={highInputRef}
              id="high"
              type="radio"
            />
            <SettingInputLabel htmlFor="high">
              <SettingLabelText>Safe space.</SettingLabelText>
              <SettingLabelSubText>
                Recommended option for when you want that squeaky clean shine.
              </SettingLabelSubText>
            </SettingInputLabel>
          </SettingContainer>
        </SettingsContainer>
      </ServerSettings>
    </Container>
  );
}

const Container = tw.main`
  min-w-[542px] max-w-[740px] pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5 text-xl font-semibold
`;

const ServerSettings = tw.section`
  flex flex-col
`;

const SubHeading = tw.h5`
  mb-2 text-xs text-gray-800 font-semibold
`;

const SubTextContainer = tw.div`
  mb-4
`;

const SubText = tw.span`
  text-sm text-gray-600 font-medium
`;

const Divider = tw.div`
  max-w-165 h-px border-t mt-10 border-gray-900/[0.08]
`;

const Bold = tw(SubText)`
  font-[600]
`;

const SettingsContainer = tw.div`
  flex flex-col max-w-[660px]
`;

const SettingContainer = tw.div`
  flex items-center mb-2 p-2.5 rounded-middle cursor-pointer
`;

const SettingInput = tw.input`
  w-min h-min ml-2 cursor-pointer scale-[1.75]
`;

const SettingInputLabel = tw.label`
  flex flex-col w-full mr-2 ml-4 cursor-pointer
`;

const SettingLabelText = tw.span`
`;

const SettingLabelSubText = tw(SettingLabelText)`
`;
