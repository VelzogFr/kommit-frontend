import { layoutContent } from '@/data/layout'

const { footer } = layoutContent

export default function Footer() {
  return (
    <footer className="flex w-full justify-center px-4 py-10">
      <p className="text-label flex flex-wrap items-center justify-center gap-[3px] text-center text-sm leading-5">
        <span>
          {footer.createdBy}{' '}
          <a
            href={footer.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-bold"
          >
            {footer.author}
          </a>{' '}
          ©
        </span>
        <span>{footer.copyright}</span>
      </p>
    </footer>
  )
}
