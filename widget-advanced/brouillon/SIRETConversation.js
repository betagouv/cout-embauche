<Group when={resolve(f, 'tauxRisqueConnu.resume.value') == 'non'}>
  <Question
    title="SIRET connu"
    question="Connaissez-vous votre numéro SIRET ?"
    form="SIRETConnu" formName="SIRETConnu"
    fields={['resume']}
    possibleChoices ={[
      {value: 'oui', text: 'Oui' },
      {value: 'non', text: 'Non' }
    ]} />
  <Input
    title="SIRET"
    question="Entrez votre SIRET"
    when={resolve(f, 'SIRETConnu.resume.value') == 'oui'}
    form="SIRET" formName="SIRET"
    fields={['resume']}
    attributes={{
      type: 'text',
      maxLength: '14',
      pattern: '[0-9]{14}',
      placeholder: '11000101300017'
    }} />
</Group>
