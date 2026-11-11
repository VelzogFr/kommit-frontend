const assetPathPrefix = "https://www.figma.com/api/mcp/asset/6515fb68-569a-49c6-9e62-c82e287cba40";
const imgLucideLogOut = `${assetPathPrefix}/0a4e9.svg`;
const imgImage13 = `${assetPathPrefix}/23718.png`;
const imgPointerFinger = `${assetPathPrefix}/ac829.svg`;

type PrimaryButtonProps = {
  className?: string;
  hasIcon?: "Default";
  state?: "Default";
  type?: "Tertiary";
};

function PrimaryButton({ className, hasIcon = "Default", state = "Default", type = "Tertiary" }: PrimaryButtonProps) {
  return (
    <div className={className || "bg-white content-stretch flex gap-[8px] items-center justify-center overflow-clip pl-[16px] pr-[12px] py-[12px] relative rounded-[8px]"} data-node-id="18:170">
      <div className="relative shrink-0 size-[24px]" data-node-id="18:166" data-name="lucide/log-out">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLucideLogOut} />
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--grey-blue,#475569)] text-center whitespace-nowrap" data-node-id="18:168">
        <p className="leading-[24px]">Se déconnecter</p>
      </div>
    </div>
  );
}

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
    <div className="bg-[#f7f9ff] content-stretch flex flex-col items-center relative size-full" data-node-id="18:582" data-name="Desktop - Full - Option 1-A">
      <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-between px-[24px] py-[20px] relative shrink-0 w-[1280px]" data-node-id="18:585" data-name="Header - Top Navigation Bar">
        <Logo className="content-stretch flex gap-[3px] items-center justify-center leading-[0] relative shrink-0" />
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-node-id="18:587" data-name="SignIn / SignOut buttons">
          <PrimaryButton className="bg-white content-stretch flex gap-[8px] items-center justify-center overflow-clip pl-[16px] pr-[12px] py-[12px] relative rounded-[8px] shrink-0" />
          <div className="absolute h-[20px] left-[92px] top-[33px] w-[20.106px]" data-node-id="18:589" data-name="Pointer Finger">
            <div className="absolute inset-[-20%_-4.97%_0_-4.97%]">
              <img alt="" className="block max-w-none size-full" src={imgPointerFinger} />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center px-[200px] py-[32px] relative shrink-0 w-full" data-node-id="18:590">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center justify-center leading-[0] not-italic py-[28px] relative shrink-0 text-center w-full" data-node-id="18:591">
          <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[#141c25] text-[0px] whitespace-nowrap" data-node-id="18:592">
            <p className="text-[48px]">
              <span className="leading-[57.6px]">Quoi de</span>
              <span className="leading-[57.6px]">{` `}</span>
              <span className="leading-[57.6px]">{`neuf `}</span>
              <span className="leading-[57.6px]">{`aujourd'hui, `}</span>
              <span className="leading-[57.6px] text-[#0763cf]">Marc ?</span>
            </p>
          </div>
          <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[18px] text-[color:var(--grey-blue,#475569)] w-[504px]" data-node-id="18:593">
            <p className="leading-[28px]">Renseigne ton daily du jour ci-dessous.</p>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="18:594" />
      <div className="content-stretch flex flex-col items-center justify-end px-[156px] py-[40px] relative shrink-0 w-[1280px]" data-node-id="18:595" data-name="Footer - Bottom Action Bar (Mobile Only)">
        <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[3px] items-center justify-center leading-[0] not-italic relative shrink-0 text-[#424753] text-[14px] text-center w-full whitespace-nowrap" data-node-id="18:596" data-name="Container">
          <div className="flex flex-col justify-center relative shrink-0" data-node-id="18:597">
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
          <div className="flex flex-col justify-center relative shrink-0" data-node-id="18:598">
            <p className="leading-[20px]">2026 Kommit. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
