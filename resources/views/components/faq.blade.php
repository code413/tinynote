@if(false)
    <div class="py-16 px-10">
        <div class="container flex flex-col">
            <h2 class="text-2xl lg:text-4xl font-bold text-center">Frequently Asked Questions</h2>
            <collapse>
                <template v-slot:header>
                    <h3 class="text-xl lg:text-2xl font-bold">What is TinyNote?</h3>
                </template>

                <template v-slot:body>
                    <p>There's always been lots of back and forth until creative visuals can get approval from the
                        client.
                        Yes, designers and project managers can relate.
                        TinyNote is a web application where you can upload your creative visuals, invite as many people
                        as
                        you want, have all the notes on the visuals in one place, track them whenever you want, get the
                        client approval, and move on to the next job.
                    </p>
                </template>
            </collapse>

            <collapse>
                <template v-slot:header>
                    <h3 class="text-xl lg:text-2xl font-bold">Why TinyNote?</h3>
                </template>

                <template v-slot:body>
                    <p>Because email corresponding is a mess. That is the last thing all of us want to upload the visual
                        in
                        an online drive or attach it to an email and send it over to the client. It also takes forever
                        to
                        keep track of them.
                        TinyNote help designers and project managers to manage their correspondings with the client as
                        easy
                        as a glass of water. It's free and no login or registration's required.
                    </p>
                </template>
            </collapse>

            <collapse>
                <template v-slot:header>
                    <h3 class="text-xl lg:text-2xl font-bold">How?</h3>
                </template>

                <template v-slot:body>
                    <ol class="list-decimal">
                        <li>Drop your visual to upload.</li>
                        <li>Share it with your teammates or client by typing their email addresses.</li>
                        <li>Get notes/comments on them.</li>
                        <li>Get it approved and move on to the next job.</li>
                    </ol>
                </template>
            </collapse>
        </div>
    </div>
@endif
