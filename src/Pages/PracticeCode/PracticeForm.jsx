import React from 'react';
import { Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import website1 from '../../assets/pictures/website1.png';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function PracticeForm() {
  return (
    <div >
      <Stack direction='row'>
        <img src={website1} alt="an image" style={{ width: '60vw', height: '100vh', backgroundColor: '#266867' }} />

        {/* login  */}
        <Stack spacing={2} style={{ padding: '15% 1% 0 1%', width: '45%', backgroundColor: '#111' }}>
          <Stack spacing={1}  >
            <TextField name='usename' placeholder='Username' size='small' color='secondary' focused style={{ backgroundColor: '#fff', borderRadius: '4px' }} />
            <TextField name='password' placeholder='Password' size='small' color='secondary' focused type='password' style={{ backgroundColor: '#fff', borderRadius: '4px' }} />
            <Stack>
              <FormControlLabel control={<Checkbox style={{ color: '#fff' }} />} label="Remember me" style={{ color: '#fff' }} />
            </Stack>
          </Stack>
          <Stack>
            <div onClick={() => { window.open('/portfolio', '_self') }}>
              <Button style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', marginLeft: '10em' }}>Login</Button>
            </div>
          </Stack>
        </Stack>

      </Stack>



    </div>
  )
}