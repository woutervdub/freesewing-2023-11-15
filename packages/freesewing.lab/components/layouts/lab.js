const LabLayout = ({ app, AltMenu, children=[] }) => (
  <div className="py-24 lg:py-36 flex flex-row">
    <div className="w-full px-8">
      {children}
    </div>
    <aside className={`
      fixed top-0 right-0
      pt-20 pb-8 px-8
      md:pt-0
      md:relative md:transform-none
      h-screen w-screen
      bg-base-100
      md:bg-base-50
      md:flex
      md:sticky
      overflow-y-scroll
      z-20
      bg-base-100 text-base-content
      transition-all
      xl:w-1/4
      ${app.primaryMenu ? '' : 'translate-x-[-100%]'} transition-transform
      md:flex-row
      md:w-80
      lg:w-96
      shrink-0
    `}>
      {AltMenu}
    </aside>
  </div>
)

export default LabLayout