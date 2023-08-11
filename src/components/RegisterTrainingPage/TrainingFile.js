import chalk from 'chalk';
import React from 'react'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const TrainingFile = ({ setTrainingFile }) => {

  const props = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(chalk.blue(info.file, info.fileList));
      }
      if (status === 'done') {
        message.success(`${info.file.name} ficheiro carregado com sucesso!`)
        console.log(info.file)
        setTrainingFile(info.file);

      } else if (status === 'error') {
        message.error(`${info.file.name} não foi possível carregar ficheiro.`);
      }
    },
    onDrop(e) {
      console.log(chalk.blueBright('Dropped files', e.dataTransfer.files))
    }
  }

  return (
    <Dragger height={150} {...props}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined style={{ color: '#ed6337' }} />
      </p>
      <p className='ant-upload-text'>Clicar ou arrastar ficheiro para esta área para realizar upload</p>
      <p className='ant-upload-hint'>
        Suporte para upload de apenas um <strong>único ficheiro</strong>.
      </p>
    </Dragger>
  )
}

export default TrainingFile