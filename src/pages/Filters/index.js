import React from 'react'
import { useHistory } from 'react-router-dom'
import { cx } from 'emotion'
import useForm from '../../hooks/useForm'
import Stack from '../../components/Stack'
import Fieldset from '../../components/Form/Fieldset'
import Select from '../../components/Form/Select'
import Radio from '../../components/Form/Radio'

function Filters() {
  const history = useHistory()
  const { state, handleChange, handleSubmit } = useForm()
  const handleCancel = () => {
    history.goBack()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gaps={[0, 20, 20, 40]}>
        <Fieldset legend="필터링">
          <Select id="filter" value={state.filter} onChange={handleChange}>
            {[
              ['', '없음'],
              ['partial', '미리보기 가능'],
              ['full', '전체 공개'],
              ['ebooks', '전체 eBooks'],
              ['free-ebooks', '무료 eBooks'],
              ['paid-ebooks', '유료 eBooks']
            ].map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Fieldset>

        <Fieldset legend="도서 종류">
          <Stack gaps={[0, 20, 20]} direction="horizontal">
            <Radio
              id="printTypeAll"
              name="printType"
              value="all"
              checked={state.printType === 'all'}
              onChange={handleChange}
              label="전체"
            />
            <Radio
              id="printTypeBooks"
              name="printType"
              value="books"
              checked={state.printType === 'books'}
              onChange={handleChange}
              label="일반도서"
            />
            <Radio
              id="printTypeMagazines"
              name="printType"
              value="magazines"
              checked={state.printType === 'magazines'}
              onChange={handleChange}
              label="잡지"
            />
          </Stack>
        </Fieldset>

        <Fieldset legend="정렬 순서">
          <Stack gaps={[0, 20, 20]} direction="horizontal">
            <Radio
              id="orderByRelevance"
              name="orderBy"
              value="relevance"
              checked={state.orderBy === 'relevance'}
              onChange={handleChange}
              label="관련성"
            />
            <Radio
              id="orderByNewest"
              name="orderBy"
              value="newest"
              checked={state.orderBy === 'newest'}
              onChange={handleChange}
              label="최신순"
            />
          </Stack>
        </Fieldset>

        <Stack gaps={[0, 10]} direction="horizontal">
          <button
            type="button"
            className={cx([styles.button, styles.cancel])}
            onClick={handleCancel}
          >
            취소
          </button>
          <button type="submit" className={cx([styles.button, styles.submit])}>
            확인
          </button>
        </Stack>
      </Stack>
    </form>
  )
}

const styles = {
  button: 'w-20 font-bold py-2 px-4 rounded-full',
  cancel:
    'border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700',
  submit: 'bg-blue-500 hover:bg-blue-700 text-white'
}

export default Filters
