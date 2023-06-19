"use client"

import { useState } from "react"
import clsx from "clsx"

import { Button } from "../ui/button"

function AboutMe() {
  const [expanded, setExpanded] = useState(false)
  return (
    <section>
      <h1 className="text-center text-3xl font-bold">About Me</h1>
      <div
        className={clsx(
          "mt-8 rounded-md bg-gray-50 text-lg px-4 py-6 font-semibold"
        )}
      >
        <article
          className={clsx({
            "line-clamp-4": !expanded,
            "line-clamp-none": expanded,
          })}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          voluptas laudantium non eligendi quam aliquam excepturi est magnam
          quibusdam qui, pariatur doloribus beatae esse et labore itaque
          accusamus quaerat doloremque! Unde temporibus culpa aut est. Provident
          dolores amet ut laborum impedit suscipit aspernatur dolorum quibusdam
          voluptatibus. Consequatur quo corporis recusandae impedit ipsam itaque
          debitis neque fuga dolorem, ducimus voluptatem iste nostrum, ad rem
          nemo quaerat. Laudantium quaerat quo at corrupti asperiores, minima
          sit explicabo similique dolor inventore veniam magnam sunt,
          consequuntur cumque exercitationem autem earum maxime dolore
          praesentium excepturi! Blanditiis iusto vel voluptatibus cum accusamus
          eius assumenda doloremque inventore possimus qui cumque fuga mollitia,
          quos temporibus similique ad sapiente maiores veritatis distinctio.
          Inventore placeat voluptas saepe molestiae velit, sint ipsa.
          Recusandae debitis enim tempora ipsum similique tenetur animi corrupti
          excepturi fugit aperiam ipsam, iure eligendi magni dignissimos facere
          minus consectetur culpa? Labore, libero ut dolores voluptatum deserunt
          eaque blanditiis perspiciatis architecto. Velit accusamus eveniet
          dicta? Unde, doloremque aut facere dolorem corporis voluptatibus non
          eligendi nobis exercitationem doloribus nemo itaque animi quasi
          recusandae! Necessitatibus sed, molestias labore corporis quas
          corrupti accusantium dolorem. Distinctio eum quisquam rem est itaque
          iste adipisci esse nulla atque sint, quis veritatis, cum aliquid nam
          officiis consectetur?
        </article>

        <Button variant={"outline"} onClick={() => setExpanded((e) => !e)} className='mt-4' >
          {expanded ? "Read less" : "Read more"}
        </Button>
      </div>
    </section>
  )
}

export default AboutMe
