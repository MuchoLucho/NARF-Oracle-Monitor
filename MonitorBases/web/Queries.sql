select v$log.group#, sequence#, bytes/1024 as KB, members, archived, v$log.status, 
member as location from v$log, v$logfile where v$log.group#=v$logfile.group#;