import { Icon28FireCircleFillRed } from "@vkontakte/icons";
import { Card, Div, Panel, SimpleCell } from "@vkontakte/vkui";
import styles from './error-panel.module.scss'

export function ErrorPanel({error} : {error: string}) { 
  return (
    <Panel>
      <Div className={styles.error}>
        <Card mode="outline">
          <SimpleCell
            before={<Icon28FireCircleFillRed/>}
          >
            Error: {error}
          </SimpleCell>
        </Card>
      </Div>
    </Panel>
  )
}