import { CircleCheckIcon, XIcon } from "lucide-react"
import type { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

// Valeurs en px, relevées dans la maquette Figma (frame F1-07).
const NAVBAR_HEIGHT = 88
const GAP_BELOW_NAVBAR = 12
const DESKTOP_EDGE_OFFSET = 20
// Sous 600px (seuil mobile de Sonner), la navbar peut passer sur 2 lignes et sa hauteur
// n'est plus fixe : le toast se place en haut de l'écran. Valeur hors maquette.
const MOBILE_EDGE_OFFSET = 16

const TOAST_OFFSET = {
  top: NAVBAR_HEIGHT + GAP_BELOW_NAVBAR,
  right: DESKTOP_EDGE_OFFSET,
}
const MOBILE_TOAST_OFFSET = {
  top: MOBILE_EDGE_OFFSET,
  right: MOBILE_EDGE_OFFSET,
  left: MOBILE_EDGE_OFFSET,
}

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      offset={TOAST_OFFSET}
      mobileOffset={MOBILE_TOAST_OFFSET}
      closeButton
      className="toaster group"
      style={{ "--width": "600px" } as CSSProperties}
      icons={{
        success: <CircleCheckIcon className="size-6" />,
        close: <XIcon className="size-6" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "right-0 flex w-max max-w-full items-center gap-2 rounded-panel border border-success bg-success-bg px-6 py-[11px] text-base leading-6 font-semibold text-success",
          icon: "flex size-6 shrink-0 items-center justify-center",
          closeButton:
            "order-last ml-2 flex size-6 shrink-0 cursor-pointer items-center justify-center text-success",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
