import React, { useContext } from "react"
import { Button } from "antd"
import ThemeContext from "../contexts/themeContext"

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const themeToSwitch = theme === 'light' ? 'dark' : 'light';

  return (
    <Button
        variant={themeToSwitch}
        onClick={() => {
            setTheme(themeToSwitch)
        }}
    >
        {theme === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}

export default ThemeSwitcher