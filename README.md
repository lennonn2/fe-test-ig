![Ignition](https://cache.ignitionapp.com/assets/32f087d1d2dd5fcc82c6b0a9240e000f/img/ignition/logo-dark.svg)

# Front end coding test

Start the app and follow instructions presented on the home page

---

There's absolutely no need to read all this, I just wanted to jot down the process I went through to get to where I ended up.

## Process

1. Started off reading through the description a couple of times to make sure I'm understanding everything correctly
2. I've used UI libraries before but not Chakra so I red through their docs to see what components would work best for this exercise
3. Same, but for RHF and Zod
4. Built out a rough schema for the form
5. Started building out the UI without an styling. Realised I was reading the wrong version of the Chakra docs so I switched to the `2.X` docs.
6. Started off just using Chakra's UI Components and not the their layout components. If I have time later I'll go back and change that so it's more in line with Ignition's codebase.
7. Built out the form using Chakra 2.X's components in what I believe is nice, semantic HTML. I'm used to doing this without a UI library so I made a note to double check this before submitting.
8. I started playing around with the Zod scheme to get the validation I wanted. I have used Yup before but not too often so most of my knowledge of these validation libraries is in theory, this took a little bit of time to get working.
9. I got it into my head that I wanted to validate that `minPrice < maxPrice` so I didn't just match the requirements exactly but this sent me down a bit of a rabbit hole. It took me about 20 minutes to find my way out but I got it working 🎉. Turns out that this was a requirement so glad I did it!
10. I was coercing a number from the string value provided by `<input>` but that was causing `''` to turn into `0` which passed the validation. I assumed there would be an easy fix for this on Google but I ended up with something not too pretty but it works well and solves that problem.
11. I moved on to actually displaying the errors in the UI and not just logging them in the console. This step was very well documented in Chakra's docs so it was very straightforward.
12. Next up was showing/hiding the min/max section depending on the Price Range toggle. A quick read through the docs led me to `watch` which was exactly what I needed
13. I noticed an annoying UX where validation was happening on change all the time. Another quick google led me to `mode` and `reValidateMode` which were exactly what I was looking for.
14. I wanted to make sure I wasn't submitting the min and max prices if the Price Range was set to `fixed` so I initially removed the data in the `saveData` function myself but thought that since RHF has had solutions to all my problems before that it might have one for this as well. Took me a bit longer to find it but `shouldUnregister: true` did exactly what I needed.
15. At this stage the UI is working as expected so I moved onto the tests
16. A lot of the test failures were trivial to fix but I had multiple failures in the `schema.test.ts` test file and the logs told me it was an `invalid_union` error which I traced back to my terribly named `priceNumber` variable. Took me a while but I discovered that the issue was with validating it as a number when I was validating it as a string from the form. I kinda ran into this in point 10 and I'm convinced there's some sort of way to get either RHF or Zod to take `<input type="number />` as a number but I won't dig into that now.

## Questions

1. Should the min and max prices/fixed price reset to empty when toggling between `Fixed` and `Range`? My assumption was no as that would be a hassle for the user if they had taken the time to add values to those fields but it does mean that we need to ignore the values when submitting the form with a Price Type of `Range`. (NOTE: Turns out this was easy to do. See 14 above but it removes the values when toggling between them so if it was needed, I'd have to look into a different solution)
2. I'm seeing a bit of UI weirdness with the separate `mode` and `reValidateMode`s sepcifically with the `Amount` field. If I submit with an invalid number, the cursor jumps to the invalid input with an error message but if I then click submit again, the error is removed until I blur away from the input. Just a little bit of weirdness I noticed.

## Known Issues

- There are TS errors in the Form component for the error messages. This is a problem with the union type but I can't quite figure it out. The funtionality is working ok but TS doesn't seem to recognise that the `amount` property can be an object with min and max values. I spent 5 minutes on it but couldn't find the solution so I left it.
- The small UI bug I mentioned in Questions point 2 above.

## What I'd do differently

- The <Form> component is far too big and hard to parse through. It needs to be broken off into other components if possible. This would be the first thing I'd try to clean up with more time.
- I used HTML elements for the layout components instead of Chakra's. This was just to save some time as I haven't used Chakra before and didn't want to run into any issues with that even if that was unlikely. The styling is pretty barebones
- I found something that worked for ensuring `min < max` and left it there. This could probably be done a bit cleaner or if not, I'd add some more comments.
