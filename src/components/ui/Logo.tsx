import logo from '@/assets/F1/logo.png'
import { layoutContent } from '@/data/layout'

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-[3px]">
      <div className="relative h-[28.671px] w-[35.128px] shrink-0">
        <div className="absolute top-[4.34px] left-[7.08px] h-[19.516px] w-[20.479px] bg-white" />
        <img
          src={logo}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <span className="text-logo text-xl leading-7 font-bold tracking-[-0.5px]">
        {layoutContent.appName}
      </span>
    </div>
  )
}
