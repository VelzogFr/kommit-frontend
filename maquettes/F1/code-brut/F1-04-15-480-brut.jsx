const assetPathPrefix = "https://www.figma.com/api/mcp/asset/634b7544-5548-47d2-bbf4-13d258e137ab";
const imgImage13 = `${assetPathPrefix}/23718.png`;
const imgContainer = `${assetPathPrefix}/6e3b7.svg`;

type LogoProps = {
  className?: string;
  property1?: "Default";
};

function Logo({ className, property1 = "Default" }: LogoProps) {
  return (
    <div className={className || "content-stretch flex gap-[3px] items-center justify-center leading-[0] relative"} data-node-id="14:2410">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="14:2405" data-name="kommit icon">
        <div className="bg-[var(--white,white)] col-1 h-[19.516px] ml-[7.08px] mt-[4.34px] relative row-1 w-[20.479px]" data-node-id="14:2406" />
        <div className="col-1 h-[28.671px] ml-0 mt-0 relative row-1 w-[35.128px]" data-node-id="14:2407" data-name="image 13">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-bold justify-center not-italic relative shrink-0 text-[#0f172a] text-[20px] tracking-[-0.5px] whitespace-nowrap" data-node-id="14:2408">
        <p className="leading-[28px]">Kommit</p>
      </div>
    </div>
  );
}

export default function DesktopFullOption1A() {
  return (
    <div className="bg-[#f7f9ff] content-stretch flex flex-col items-center relative size-full" data-node-id="15:480" data-name="Desktop - Full - Option 1-A">
      <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-between px-[24px] py-[20px] relative shrink-0 w-[1280px]" data-node-id="15:483" data-name="Header - Top Navigation Bar">
        <Logo className="content-stretch flex gap-[3px] items-center justify-center leading-[0] relative shrink-0" />
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="15:485" data-name="SignIn / SignOut buttons">
          <div className="bg-[var(--white,white)] border border-[#0051ae] border-solid content-stretch flex items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[4px] shrink-0" data-node-id="15:486" data-name="Primary Button">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--blue-text,#055bbf)] text-center whitespace-nowrap" data-node-id="I15:486;14:2321">
              <p className="leading-[24px]">Se connecter</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center px-[200px] py-[32px] relative shrink-0 w-full" data-node-id="15:487" data-name="Title">
        <div className="h-[154px] min-h-[154px] relative shrink-0 w-full" data-node-id="15:488" />
      </div>
      <div className="h-[722.718px] relative shrink-0 w-[1280px]" data-node-id="15:489">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-[440px] max-w-[400px] top-0 w-[400px]" data-node-id="17:153" data-name="Auth Container">
          <div className="bg-white border border-[rgba(194,198,214,0.15)] border-solid content-stretch drop-shadow-[0px_12px_16px_rgba(20,28,37,0.04)] flex flex-col gap-[32px] items-center min-h-[479px] p-[33px] relative rounded-[8px] shrink-0 w-full" data-node-id="17:154" data-name="Authentication Card">
            <div className="relative shrink-0 w-[398px]" data-node-id="17:155" data-name="HorizontalBorder">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
                <div className="flex-[1_0_0] min-w-px relative" data-node-id="17:156" data-name="Header">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
                    <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#141c25] text-[24px] text-center w-full" data-node-id="17:157">
                      <p className="leading-[33.6px]">Créer un compte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[334px]" data-node-id="17:158" data-name="TextInput">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I17:158;16:138" data-name="LabelContainer">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="I17:158;16:139" data-name="Label">
                    <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#424753] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap" data-node-id="I17:158;16:140">
                      <p className="leading-[16px]">prénom*</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f7f9ff] border-[#dae3ef] border-b-2 border-l border-r border-solid border-t h-[43px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="I17:158;16:141" data-name="Input">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-[12px] not-italic text-[14px] text-[color:var(--grey-blue,#475569)] top-[20.5px] w-[308px]" data-node-id="I17:158;16:142">
                    <p className="leading-[normal]">Marc</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[334px]" data-node-id="17:159" data-name="TextInput">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I17:159;16:138" data-name="LabelContainer">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="I17:159;16:139" data-name="Label">
                    <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#424753] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap" data-node-id="I17:159;16:140">
                      <p className="leading-[16px]">EMAIL*</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f7f9ff] border-[#dae3ef] border-b-2 border-l border-r border-solid border-t h-[43px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="I17:159;16:141" data-name="Input">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-[12px] not-italic text-[14px] text-[color:var(--grey-blue,#475569)] top-[20.5px] w-[308px]" data-node-id="I17:159;16:142">
                    <p className="leading-[normal]">marc.developpeur@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[334px]" data-node-id="17:160" data-name="TextInput">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I17:160;16:138" data-name="LabelContainer">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="I17:160;16:139" data-name="Label">
                    <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#424753] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap" data-node-id="I17:160;16:140">
                      <p className="leading-[16px]">MOT DE PASSE*</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f7f9ff] border-[#dae3ef] border-b-2 border-l border-r border-solid border-t h-[43px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="I17:160;16:141" data-name="Input">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-[12px] not-italic text-[14px] text-[color:var(--grey-blue,#475569)] top-[20.5px] w-[308px]" data-node-id="I17:160;16:142">
                    <p className="leading-[normal]">***</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[43px] relative rounded-[4px] shrink-0 w-[334px]" data-node-id="19:289" style={{ backgroundImage: "linear-gradient(132.92996957342163deg, rgb(0, 81, 174) 0%, rgb(9, 105, 218) 100%)" }} data-name="Button">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end justify-center py-[10px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.35px] whitespace-nowrap" data-node-id="19:290">
                  <p className="leading-[20px]">Créer un compte</p>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-full" data-node-id="17:161" data-name="Footer Link">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#424753] text-[14px] text-center whitespace-nowrap" data-node-id="17:162">
                  <p>
                    <span className="leading-[20px]">{`Tu as déjà un compte ? `}</span>
                    <span className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic text-[#0051ae]">Connecte-toi.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0" data-node-id="17:163" data-name="Security Notice:margin">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="17:164" data-name="Security Notice">
              <div className="h-[12.25px] relative shrink-0 w-[9.333px]" data-node-id="17:165" data-name="Container">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer} />
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="17:167" data-name="Container">
                <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(66,71,83,0.6)] tracking-[1px] uppercase whitespace-nowrap" data-node-id="17:168">
                  <p className="leading-[15px]">AUTHENTICATION SÉCURISÉE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-end px-[156px] py-[40px] relative shrink-0 w-[1280px]" data-node-id="15:491" data-name="Footer - Bottom Action Bar (Mobile Only)">
        <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[3px] items-center justify-center leading-[0] not-italic relative shrink-0 text-[#424753] text-[14px] text-center w-full whitespace-nowrap" data-node-id="15:492" data-name="Container">
          <div className="flex flex-col justify-center relative shrink-0" data-node-id="15:493">
            <p>
              <span className="font-['Inter:Regular'] font-normal leading-[20px]">{`Créé par `}</span>
              <a className="cursor-pointer font-['Inter:Bold'] font-bold leading-[20px]" href="https://www.youtube.com/@videv9858" target="_blank">
                <span href="https://www.youtube.com/@videv9858" target="_blank">
                  ViDev
                </span>
              </a>
              <span className="font-['Inter:Regular'] font-normal leading-[20px]">{` `}</span>
              <span className="font-['Inter:Regular'] font-normal leading-[20px]">©</span>
            </p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0" data-node-id="15:494">
            <p className="leading-[20px]">2026 Kommit. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
