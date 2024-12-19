![Ignition](https://cache.ignitionapp.com/assets/32f087d1d2dd5fcc82c6b0a9240e000f/img/ignition/logo-dark.svg)

# Front end coding test

Start the app and follow instructions presented on the home page

---

## Process

1. Started off reading through the description a couple of times to make sure I'm understanding everything correctly
2. I've used UI libraries before but not Chakra so I red through their docs to see what components would work best for this exercise
3. Same, but for RHF and Zod
4. Built out a rough schema for the form
5. Started building out the UI without an styling. Realised I was reading the wrong version of the Chakra docs so I switched to the `2.X` docs.
6. Started off just using Chakra's UI Components and not the their layout components. If I have time later I'll go back and change that so it's more in line with Ignition's codebase.
7. Built out the form using Chakra 2.X's components in what I believe is nice, semantic HTML. I'm used to doing this without a UI library so I made a note to double check this before submitting.
8. I started playing around with the Zod scheme to get the validation I wanted. I have used Yup before but not too often so most of my knowledge of these validation libraries is in theory, this took a little bit of time to get working.
9. I got it into my head that I wanted to validate that `minPrice < maxPrice` so I didn't just match the requirements exactly but this sent me down a bit of a rabbit hole. It took me about 20 minutes to find my way out but I got it working 🎉
10. I was coercing a number from the string value provided by `<input>` but that was causing `''` to turn into `0` which passed the validation. I assumed there would be an easy fix for this on Google but I ended up with something not too pretty but it works well and solves that problem.
11. I moved on to actually displaying the errors in the UI and not just logging them in the console. This step was very well documented in Chakra's docs so it was very straightforward.
12. Next up was showing/hiding the min/max section depending on the Price Range toggle. A quick read through the docs led me to `watch` which was exactly what I needed
13. I noticed an annoying UX where validation was happening on change all the time. Another quick google led me to `mode` and `reValidateMode` which were exactly what I was looking for.
14. I wanted to make sure I wasn't submitting the min and max prices if the Price Range was set to `fixed` so I initially removed the data in the `saveData` function myself but thought that since RHF has had solutions to all my problems before that it might have one for this as well. Took me a bit longer to find it but `shouldUnregister: true` did exactly what I needed.
15.

## Questions

1. Should the min and max prices reset to empty when toggling between `Fixed` and `Range`? My assumption was no as that would be a hassle for the user if they had taken the time to add values to those fields but it does mean that we need to ignore the values when submitting the form with a Price Type of `Range`.

## Choices

- Ideally, I'd like to use Chakra entirely to build the UI but for right now I'm focusing on using just their UI Components and not their Layout components. I made this choice as, to me, it seems like showing that I know how to use Zod, a component library and RHF is of higher importance
