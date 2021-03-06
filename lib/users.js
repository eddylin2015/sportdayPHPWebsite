var records = [
  { id: 0, username: 'sa', password: '000', displayName: 'SysAdmin', emails: [{ value: 'sp@mail.mbc.edu.mo' }] },
  { id: 1, username: 't0', password: '123', displayName: 'TeacherA', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 2, username: 't1', password: '123', displayName: 'TeacherB', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 3, username: 't2', password: '123', displayName: 'TeacherC', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 4, username: 't3', password: '123', displayName: 'TeacherD', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 5, username: 't4', password: '123', displayName: 'TeacherE', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 6, username: 't5', password: '123', displayName: 'TeacherF', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 7, username: 't6', password: '123', displayName: 'TeacherG', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 8, username: 't7', password: '123', displayName: 'TeacherF', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 9, username: 't8', password: '123', displayName: 'TeacherG', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 10, username: 'st1', password: '123', displayName: 'StudentC', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 11, username: 'st2', password: '123', displayName: 'StudentD', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 12, username: 'st3', password: '123', displayName: 'StudentE', emails: [{ value: 'test@mail.mbc.edu.mo' }] },
  { id: 13, username: 'st4', password: '123', displayName: 'StudentF', emails: [{ value: 'test@mail.mbc.edu.mo' }] }
];

exports.findById = function (id, cb) {
  process.nextTick(function () {
    let found = false;
    for (let i = 0; i < records.length; i++) {
      if (records[i].id == id) {
        cb(null, records[i]);
        found = true;
        break;
      }
    }
    if (!found) {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}