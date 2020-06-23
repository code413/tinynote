const {colors} = require('tailwindcss/defaultTheme')

module.exports = {
    purge: [
        './resources/views/**/*.blade.php',
        './resources/css/**/*.css',
    ],
    theme: {
        extend: {
            colors: {
                orange: {
                    ...colors.orange,
                    '100': '#fcf0e3',
                }
            }
        },
        borderRadius: {
            'none': '0',
            'sm': '0.125rem',
            default: '0.25rem',
            'md': '0.375rem',
            'lg': '0.5rem',
            'full': '9999px',
            'large': '1rem',
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/custom-forms')
    ]
}
