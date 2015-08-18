## defaultExport :: (String -> Bool) -> String -> IO (Array File)

Reads all the files in a folder that match the predicate and turns them into
an array of file objects.
 
file objects look like:
 
```
{
  path :: String,
  content :: String,
}
```
 
 