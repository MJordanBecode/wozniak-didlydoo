import { Router } from 'express'

import { createAttendanceSchema } from '../schemas/attendance.mjs'
import { getDB, remapData } from '../helpers/functions.mjs'
import * as mw from '../helpers/middlewares.mjs'

const router = Router()

router.post('/events/:_id/attend', mw.idSpecific, mw.noBody, mw.getElem, mw.validation(createAttendanceSchema), async (req, res, next) => {
  const db = await getDB();

  const attendee = {
    name: req.body.name,
    dates: db.data[req._elem].dates.map(dateStr => {
      const incoming = req.body.dates.find(d => d.date === dateStr);
      return {
        date: dateStr,
        available: incoming?.available ?? false
      };
    })
  };

  if (db.data[req._elem].attendees.find(a => a.name === attendee.name))
    return res.status(400).send({ error: `Attendee '${attendee.name}' already exists` });

  db.data[req._elem].attendees.push(attendee);
  await db.write();

  return res.send(remapData(db.data[req._elem]));
});

router.patch('/events/:_id/attend', mw.idSpecific, mw.noBody, mw.getElem, mw.validation(createAttendanceSchema), async (req, res, next) => {
  const db = await getDB();
  const idx = db.data[req._elem].attendees.findIndex(a => a.name === req.body.name);

  if (idx === -1)
    return res.status(404).send({ error: `Attendee '${req.body.name}' does not exist.` });

  const updatedAttendee = {
    name: req.body.name,
    dates: db.data[req._elem].dates.map(dateStr => {
      const incoming = req.body.dates.find(d => d.date === dateStr);
      return {
        date: dateStr,
        available: incoming?.available ?? false
      };
    })
  };

  db.data[req._elem].attendees[idx] = updatedAttendee;
  await db.write();

  return res.send(remapData(db.data[req._elem]));
});

router.get('/attendees/:_name?', async (req, res, next) => {  
  const db = await getDB()
  const ret = []

  for (const event of db.data) {
    for(const attendee of event.attendees){
      const _attendee = ret.findIndex(f => f.name === attendee.name)
      if(_attendee === -1){
        ret.push({
          name: attendee.name,
          events: [
            {
              id: event.id,
              dates: event.attendees.find(f => f.name === attendee.name).dates
            }
          ]
        })
      }
      else{
        ret[_attendee].events.push({
          id: event.id,
          dates: event.attendees.find(f => f.name === attendee.name).dates
        })
      }
    }
  }

  const { _name } = req.params

  if(_name !== undefined){
    const filteredRet = ret.find(f => f.name === _name)

    if(filteredRet === undefined)
      return res.status(404).send({error: `Attendee '${_name}' does not exist.`})
    
    return res.send(filteredRet)
  }
  
  return res.send(ret)
})


export default router