import Level0 from '../assets/skill_level/skill_level_0_svg.svg'
import Level1 from '../assets/skill_level/skill_level_1_svg.svg'
import Level10 from '../assets/skill_level/skill_level_10_svg.svg'
import Level2 from '../assets/skill_level/skill_level_2_svg.svg'
import Level3 from '../assets/skill_level/skill_level_3_svg.svg'
import Level4 from '../assets/skill_level/skill_level_4_svg.svg'
import Level5 from '../assets/skill_level/skill_level_5_svg.svg'
import Level6 from '../assets/skill_level/skill_level_6_svg.svg'
import Level7 from '../assets/skill_level/skill_level_7_svg.svg'
import Level8 from '../assets/skill_level/skill_level_8_svg.svg'
import Level9 from '../assets/skill_level/skill_level_9_svg.svg'

// Decide on which level to choose
  export const chooseLevelSvg = (e) => {
    switch (e) {
      case 1:
        return Level1
      case 2:
        return Level2
      case 3:
        return Level3
      case 4:
        return Level4
      case 5:
        return Level5
      case 6:
        return Level6
      case 7:
        return Level7
      case 8:
        return Level8
      case 9:
        return Level9
      case 10:
        return Level10
      default:
        return Level0
    }
  }